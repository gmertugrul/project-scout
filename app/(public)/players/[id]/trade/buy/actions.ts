"use server";

import { z } from "zod";
import { ipos, nftBalances, users } from "@/app/db/schema";
import { getDb } from "@/app/db";
import { and, eq, gte, sql } from "drizzle-orm";
import { getSessionUser } from "@/app/lib/auth";
import { getFirst } from "@/app/lib/helpers";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const purchaseIPOSchema = z.object({
  ipoId: z.coerce.number().int().nonnegative().finite(),
  amount: z.coerce
    .bigint()
    .min(BigInt(1), { message: "Amount should be at least 1" }),
});

export async function purchaseIPO(_: any, formData: FormData) {
  "use server";

  const fields = purchaseIPOSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!fields.success) {
    return {
      errors: fields.error.flatten().fieldErrors,
    };
  }

  const user = await getSessionUser(cookies());

  if (!user || user.role == "disabled") {
    return {
      error: "You are not logged in.",
    };
  }

  let db = await getDb();

  const result = await db.transaction(async (conn) => {
    const ipo = await conn
      .select()
      .from(ipos)
      .for("update")
      .where(and(eq(ipos.id, fields.data.ipoId), eq(ipos.status, "active")))
      .then(getFirst);

    if (!ipo) {
      return {
        error: "IPO not available",
      };
    }

    const u = await conn
      .select()
      .from(users)
      .for("update")
      .where(
        and(
          eq(users.id, user.id),
          sql`${users.creditBalance} >= ${fields.data.amount}::numeric * ${ipo.unitPrice}::numeric`,
        ),
      )
      .then(getFirst);

    if (!u) {
      return {
        error: "You don't have the necessary credit balance for this purchase",
      };
    }

    const balance = await conn
      .insert(nftBalances)
      .values({
        userId: user.id,
        nftContractId: ipo.nftContractId,
        balance: fields.data.amount,
      })
      .onConflictDoUpdate({
        target: [nftBalances.userId, nftBalances.nftContractId],
        set: {
          balance: sql`${nftBalances.balance} + ${fields.data.amount}`,
        },
      })
      .returning()
      .then(getFirst);

    await conn
      .update(users)
      .set({
        creditBalance: sql`${users.creditBalance} - ${fields.data.amount}::numeric * ${ipo.unitPrice}::numeric`,
      })
      .where(eq(users.id, u.id));

    return { balance };
  });

  if ("error" in result) return { error: result.error };

  revalidatePath("/");

  return { balance: result.balance };
}
