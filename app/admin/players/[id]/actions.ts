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

  const imageFile = formData.get("picture") as File;

  if (imageFile.size) {
    const blob = await put(`images/${uuidv4()}`, imageFile, {
      access: "public",
      contentType: imageFile.type,
    });

    playerData.picture = blob.url;
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

const updatePlayerStatsSchema = z
  .object({
    id: z.coerce.number().int().nonnegative(),
  })
  .catchall(z.coerce.number().int().min(0).max(20).optional());

export async function updatePlayerStats(_: any, formData: FormData) {
  "use server";

  const fields = updatePlayerStatsSchema.safeParse(
    Object.fromEntries(
      Array.from(formData.entries()).filter((x) => !x[0].startsWith("$"))
    )
  );

  if (!fields.success) {
    return {
      errors: fields.error.flatten().fieldErrors,
    };
  }

  const getStats = (name: string) =>
    Object.fromEntries(
      Array.from(Object.entries(fields.data))
        .filter((x) => x[0].startsWith(`${name}.`))
        .map((x) => [x[0].replace(`${name}.`, ""), x[1] == 0 ? null : x[1]])
    ) as any;

  const db = await getDb();

  await db.transaction(async (tx) => {
    await tx
      .insert(technicalStats)
      .values({ playerId: fields.data.id, ...getStats("technicalStats") })
      .onConflictDoUpdate({
        target: technicalStats.playerId,
        set: getStats("technicalStats"),
      });

    await tx
      .insert(goalkeeperStats)
      .values({ playerId: fields.data.id, ...getStats("goalkeeperStats") })
      .onConflictDoUpdate({
        target: goalkeeperStats.playerId,
        set: getStats("goalkeeperStats"),
      });

    await tx
      .insert(mentalStats)
      .values({ playerId: fields.data.id, ...getStats("mentalStats") })
      .onConflictDoUpdate({
        target: mentalStats.playerId,
        set: getStats("mentalStats"),
      });

    await tx
      .insert(physicalStats)
      .values({ playerId: fields.data.id, ...getStats("physicalStats") })
      .onConflictDoUpdate({
        target: physicalStats.playerId,
        set: getStats("physicalStats"),
      });
  });

  return { success: true };
}
