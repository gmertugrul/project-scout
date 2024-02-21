import { notFound } from "next/navigation";
import { PlayerStatsEditor } from "./editor";
import { getDb } from "@/app/db";
import { eq } from "drizzle-orm";
import {
  goalkeeperStats,
  mentalStats,
  physicalStats,
  technicalStats,
} from "@/app/db/schema";
import { getPlayer } from "@/app/db/getters";
import { idSchema } from "@/app/lib/helpers";

export default async function PlayerStats({ params }: { params: any }) {
  const { id } = idSchema.parse(params);

  const player = await getPlayer(id);

  if (!player) {
    return notFound();
  }

  const db = await getDb();

  const stats = {
    technicalStats:
      (await db.query.technicalStats.findFirst({
        where: eq(technicalStats.playerId, player.id),
      })) ??
      (
        await db
          .insert(technicalStats)
          .values({ playerId: player.id })
          .onConflictDoNothing()
          .returning()
      )[0],
    mentalStats:
      (await db.query.mentalStats.findFirst({
        where: eq(mentalStats.playerId, player.id),
      })) ??
      (
        await db
          .insert(mentalStats)
          .values({ playerId: player.id })
          .onConflictDoNothing()
          .returning()
      )[0],
    physicalStats:
      (await db.query.physicalStats.findFirst({
        where: eq(physicalStats.playerId, player.id),
      })) ??
      (
        await db
          .insert(physicalStats)
          .values({ playerId: player.id })
          .onConflictDoNothing()
          .returning()
      )[0],
    goalkeeperStats:
      (await db.query.goalkeeperStats.findFirst({
        where: eq(goalkeeperStats.playerId, player.id),
      })) ??
      (
        await db
          .insert(goalkeeperStats)
          .values({ playerId: player.id })
          .onConflictDoNothing()
          .returning()
      )[0],
  };

  return <PlayerStatsEditor player={player} stats={stats} />;
}
