"use server";

import { z } from "zod";
import { IpoInsert, ipos, ipoStatus, nftContracts } from "@/app/db/schema";
import { getDb } from "@/app/db";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

const updateIpoSchema = z.object({
  nftContractId: z.coerce.number().int().nonnegative(),
  totalSupply: z.coerce.number().int().min(1),
  status: z.enum(ipoStatus.enumValues),
  unitPrice: z.string().regex(/^[+-]?\d+(\.\d{1,2})?$/),
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
    status: fields.data.status,
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
