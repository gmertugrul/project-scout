"use server";

import { z } from "zod";
import { getSessionUser } from "@/app/lib/auth";
import { cookies } from "next/headers";
import { getDb } from "@/app/db";
import {
  nftBalances,
  nftContracts,
  NftListingInsert,
  nftListings,
} from "@/app/db/schema";
import { and, eq, sql } from "drizzle-orm";
import { getFirst } from "@/app/lib/helpers";
import { revalidatePath } from "next/cache";
import Big from "big.js";

const sellSchema = z.object({
  nftContractId: z.coerce.number().int().nonnegative().finite(),
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
  price: z
    .string()
    .regex(/^[-+]?\d+(\.\d+)?$/, {
      message: "Price should be a positive amount",
    })
    .transform((x, ctx) => {
      try {
        return Big(x);
      } catch {
        ctx.addIssue({ fatal: true, message: "Anan", code: "custom" });
        return z.NEVER;
      }
    }),
});

export async function sell(_: any, formData: FormData) {
  const fields = sellSchema.safeParse(Object.fromEntries(formData.entries()));

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

  const db = await getDb();

  const result = await db.transaction(async (conn) => {
    const nft = await conn.query.nftContracts.findFirst({
      where: eq(nftContracts.id, fields.data.nftContractId),
    });

    if (!nft || !nft.isTradable) {
      return {
        error: "This NFT is not open to trading at the moment.",
      };
    }

    const balance = await conn
      .select()
      .from(nftBalances)
      .where(
        sql`${nftBalances.userId} = ${user.id} and ${nftBalances.nftContractId} = ${nft.id}`,
      )
      .for("update")
      .then(getFirst);

    const currentListings = await conn
      .select({
        id: nftListings.id,
      })
      .from(nftListings)
      .where(
        and(
          eq(nftListings.nftContractId, nft.id),
          eq(nftListings.userId, user.id),
          eq(nftListings.status, "active"),
        ),
      )
      .for("update");

    const freeBalance =
      (balance?.balance ?? BigInt(0)) - BigInt(currentListings.length);

    if (!balance || freeBalance < fields.data.amount) {
      return {
        error:
          "You do not own the necessary amound of shares for this listing.",
      };
    }

    const listings: NftListingInsert[] = [];

    for (let i = BigInt(0); i < fields.data.amount; i++) {
      listings.push({
        userId: user.id,
        nftContractId: nft.id,
        price: fields.data.price.toString(),
      });
    }

    await conn.insert(nftListings).values(listings);

    return { success: true };
  });

  if ("error" in result) {
    return { error: result.error };
  }

  revalidatePath("/");

  return { success: true };
}
