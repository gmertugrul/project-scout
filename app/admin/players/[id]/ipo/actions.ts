"use server";

import { z } from "zod";
import { IpoInsert, ipos, nftContracts } from "@/app/db/schema";
import { getDb } from "@/app/db";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

const updateIpoSchema = z.object({
  nftContractId: z.coerce.number().int().nonnegative(),
  totalSupply: z.coerce.number().int().min(1),
  unitPrice: z
    .string()
    .regex(/^[+-]?\d+(\.\d{1,2})?$/)
    .transform((x) => {
      let parts = x.split(".");

      if (parts.length == 1) {
        return BigInt(parts[0]) * BigInt(100);
      }

      return BigInt(parts[0]) * BigInt(100) + BigInt(parts[1]);
    }),
});

export async function updateIpo(_: any, formData: FormData) {
  const fields = updateIpoSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!fields.success) {
    return {
      errors: fields.error.flatten().fieldErrors,
    };
  }

  const data: IpoInsert = {
    nftContractId: fields.data.nftContractId,
    totalSupply: fields.data.totalSupply,
    unitPrice: fields.data.unitPrice,
  };

  let db = await getDb();

  let contract = await db.query.nftContracts.findFirst({
    where: eq(nftContracts.id, data.nftContractId),
  });

  if (!contract) {
    return {
      error: "Contract not found",
    };
  }

  if (contract.totalSupply < data.totalSupply) {
    return {
      errors: {
        totalSupply: [`Total supply can not exceed ${contract.totalSupply}`],
      },
    };
  }

  let result = await db
    .insert(ipos)
    .values(data)
    .onConflictDoUpdate({
      target: ipos.nftContractId,
      set: data,
    })
    .returning();

  revalidatePath(`/admin/players`);

  return { ipo: result[0] };
}
