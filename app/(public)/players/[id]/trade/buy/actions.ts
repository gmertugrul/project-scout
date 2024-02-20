"use server";

import { z } from "zod";
import { ipos, nftBalances, nftListings, users } from "@/app/db/schema";
import { getDb } from "@/app/db";
import { and, eq, gte, not, sql } from "drizzle-orm";
import { getSessionUser } from "@/app/lib/auth";
import { getFirst } from "@/app/lib/helpers";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const purchaseIPOSchema = z.object({
  ipoId: z.coerce.number().int().nonnegative().finite(),
  amount: z
    .string()
    .transform((x) => {
      try {
        return BigInt(x);
      } catch {
        return BigInt(0);
      }
    })
    .pipe(
      z.bigint().min(BigInt(1), { message: "Amount should be at least 1" }),
    ),
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

  return redirect(
    `/players/my?message=${encodeURIComponent("Purchase complete")}`,
  );
}

const purchaseListingSchema = z.object({
  listingId: z
    .string()
    .transform((x) => {
      try {
        return BigInt(x);
      } catch {
        return BigInt(0);
      }
    })
    .pipe(z.bigint()),
});

export async function purchaseListing(_: any, formData: FormData) {
  const fields = purchaseListingSchema.safeParse(
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
    const listing = await conn
      .select()
      .from(nftListings)
      .where(
        and(
          eq(nftListings.id, fields.data.listingId),
          eq(nftListings.status, "active"),
          not(eq(nftListings.userId, user.id)),
        ),
      )
      .for("update")
      .then(getFirst);

    if (!listing) {
      return {
        error:
          "This listing is not available for purchase or already purchased by another user.",
      };
    }

    const me = await conn
      .select()
      .from(users)
      .where(
        and(
          eq(users.id, user.id),
          sql`${users.creditBalance} >= ${nftListings.price}::numeric`,
        ),
      )
      .for("update")
      .then(getFirst);

    if (!me) {
      return {
        error:
          "You do not have the necessary credit balance for this purchase.",
      };
    }

    await conn
      .update(nftListings)
      .set({
        status: "completed",
      })
      .where(eq(nftListings.id, listing.id));

    await conn
      .update(users)
      .set({
        creditBalance: sql`${users.creditBalance} - ${listing.price}::numeric`,
      })
      .where(eq(users.id, me.id));

    await conn
      .insert(nftBalances)
      .values({
        userId: me.id,
        nftContractId: listing.nftContractId,
        balance: BigInt(1),
      })
      .onConflictDoUpdate({
        target: [nftBalances.userId, nftBalances.nftContractId],
        set: {
          balance: sql`${nftBalances.balance} + 1`,
        },
      });

    return { success: true };
  });

  if ("error" in result) return { error: result.error };

  revalidatePath("/");

  return { success: true };
}
