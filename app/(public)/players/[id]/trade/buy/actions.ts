"use server";

import { z } from "zod";
import { ipos, nftBalances } from "@/app/db/schema";
import { getDb } from "@/app/db";
import { eq, sql } from "drizzle-orm";
import { getUser } from "@/app/lib/auth";
import { getFirst } from "@/app/lib/helpers";

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

  const user = await getUser();

  if (!user || user.role == "disabled") {
    return {
      error: "You are not logged in.",
    };
  }

  let db = await getDb();

  const ipo = await db.query.ipos.findFirst({
    where: eq(ipos.id, fields.data.ipoId),
  });

  if (!ipo) {
    return {
      error: "IPO not available",
    };
  }

  const balance = await db
    .insert(nftBalances)
    .values({
      userId: user.id,
      nftContractId: ipo.nftContractId,
      balance: Number(fields.data.amount),
    })
    .onConflictDoUpdate({
      target: [nftBalances.userId, nftBalances.nftContractId],
      set: {
        balance: sql`${nftBalances.balance} + ${Number(fields.data.amount)}`,
      },
    })
    .returning()
    .then(getFirst);

  return { balance: balance!.balance };
}
