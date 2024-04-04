"use server";

import { getDb } from "@/app/db";
import {
  PlayerInsert,
  goalkeeperStats,
  mentalStats,
  physicalStats,
  players,
  technicalStats,
} from "@/app/db/schema";
import { z } from "zod";
import { put } from "@vercel/blob";
import { v4 as uuidv4 } from "uuid";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { countryCodes } from "@/app/lib/countries";
import { positionCodes } from "@/app/lib/positions";

const updatePlayerSchema = z.object({
  id: z.coerce.number().int().nonnegative(),
  firstName: z.string().min(1).max(256),
  lastName: z.string().min(1).max(256),
  birthDate: z.coerce.date().max(new Date()),
  countryCode: z
    .string()
    .transform((x) => (x === "" ? null : x))
    .pipe(z.enum(countryCodes).nullable().optional()),
  position: z
    .string()
    .transform((x) => (x === "" ? null : x))
    .pipe(z.enum(positionCodes).nullable().optional()),
  teamId: z
    .string()
    .transform((x) => (x === "" ? null : parseInt(x)))
    .pipe(z.number().int().nonnegative().nullable()),
});

export async function updatePlayer(_: any, formData: FormData) {
  "use server";

  const fields = updatePlayerSchema.safeParse(
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
    countryCode: fields.data.countryCode,
    position: fields.data.position,
    teamId: fields.data.teamId,
  };

  const picture = formData.get("picture") as File;

  if (picture.size) {
    const blob = await put(`images/${uuidv4()}`, picture, {
      access: "public",
      contentType: picture.type,
    });

    playerData.picture = blob.url;
  }

  const portrait = formData.get("portrait") as File;

  if (portrait.size) {
    const blob = await put(`images/${uuidv4()}`, portrait, {
      access: "public",
      contentType: portrait.type,
    });

    playerData.portrait = blob.url;
  }

  let db = await getDb();

  let player = await db
    .update(players)
    .set(playerData)
    .where(eq(players.id, fields.data.id))
    .returning();

  revalidatePath(`/admin/players/${fields.data.id}`);

  return { player: player[0] };
}
