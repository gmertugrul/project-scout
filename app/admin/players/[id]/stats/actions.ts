"use server";

import { z } from "zod";
import { getDb } from "@/app/db";
import {
  goalkeeperStats,
  mentalStats,
  physicalStats,
  technicalStats,
} from "@/app/db/schema.stats";

const updatePlayerStatsSchema = z
  .object({
    id: z.coerce.number().int().nonnegative(),
  })
  .catchall(z.coerce.number().int().min(0).max(20).optional());

export async function updatePlayerStats(_: any, formData: FormData) {
  const fields = updatePlayerStatsSchema.safeParse(
    Object.fromEntries(
      Array.from(formData.entries()).filter((x) => !x[0].startsWith("$")),
    ),
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
        .map((x) => [x[0].replace(`${name}.`, ""), x[1] == 0 ? null : x[1]]),
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
