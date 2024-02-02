"use server";

import { getDb } from "@/app/db";
import { Player, PlayerInsert, players } from "@/app/db/schema";
import { z } from "zod";
import { put } from "@vercel/blob";
import { v4 as uuidv4 } from "uuid";

const createPlayerSchema = z.object({
  firstName: z.string().min(1).max(256),
  lastName: z.string().min(1).max(256),
  birthDate: z.coerce.date().max(new Date()),
});

export async function createPlayer(_: any, formData: FormData) {
  "use server";

  const fields = createPlayerSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!fields.success) {
    return {
      errors: fields.error.flatten().fieldErrors,
    };
  }

  let playerData: PlayerInsert = {
    firstName: fields.data.firstName,
    lastName: fields.data.lastName,
    birthDate: fields.data.birthDate?.toISOString(),
  };

  const imageFile = formData.get("picture") as File;

  if (imageFile.size) {
    const blob = await put(`images/${uuidv4()}`, imageFile, {
      access: "public",
      contentType: imageFile.type,
    });

    playerData.picture = blob.url;
  }

  let db = await getDb();
  let player = await db.insert(players).values(playerData).returning();

  return { player: player[0] };
}
