"use server";

import { getDb } from "@/app/db";
import { NftContractInsert, nftContracts, nfts } from "@/app/db/schema";
import { z } from "zod";
import { eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { idSchema } from "@/app/lib/helpers";

const updateNftContractSchema = z.object({
  playerId: z.coerce.number().int().nonnegative(),
  name: z.string().min(1).max(256),
  address: z.string().min(1).max(256),
  symbol: z.string().min(1).max(32),
  totalSupply: z.coerce.number().int().min(1).max(10000000),
  isTradable: z.coerce.boolean(),
});

export async function updateNftContract(_: any, formData: FormData) {
  const fields = updateNftContractSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!fields.success) {
    return {
      errors: fields.error.flatten().fieldErrors,
    };
  }

  let nftData: NftContractInsert = {
    name: fields.data.name,
    address: fields.data.address,
    symbol: fields.data.symbol,
    totalSupply: fields.data.totalSupply,
    playerId: fields.data.playerId,
    isTradable: fields.data.isTradable,
  };

  let db = await getDb();

  let nftContract = await db
    .insert(nftContracts)
    .values(nftData)
    .onConflictDoUpdate({
      target: nftContracts.playerId,
      set: {
        ...nftData,
        totalSupply: sql`greatest(${nftContracts.totalSupply}, ${nftData.totalSupply})`,
      },
    })
    .returning();

  revalidatePath(`/admin/players/${fields.data.playerId}/nft`);

  return { nftContract: nftContract[0] };
}

export async function mintNft(_: any, formData: FormData) {
  const fields = idSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!fields.success) {
    return {
      errors: fields.error.flatten().fieldErrors,
    };
  }

  const db = await getDb();

  const contract = await db.query.nftContracts.findFirst({
    where: eq(nftContracts.id, fields.data.id),
  });

  if (!contract) {
    return {
      error: "Contract not found",
    };
  }

  const { rows } = await db.execute(
    sql`select max(${nfts.index}) as minindex from ${nfts} where ${nfts.nftContractId} = ${contract.id}`,
  );

  let minIndex = 1;

  if (rows.length && typeof rows[0].minindex == "number")
    minIndex = rows[0].minindex + 1;

  if (minIndex > contract.totalSupply) {
    return {
      error: `Contract currently has ${minIndex - 1} NFTs already minted.`,
    };
  }

  const result = await db
    .insert(nfts)
    .values({
      nftContractId: contract.id,
      index: minIndex,
    })
    .returning();

  revalidatePath(`/admin/players`);

  return { nft: result[0] };
}
