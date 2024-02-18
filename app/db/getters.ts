import { cache } from "react";
import { getDb } from ".";
import { players, starredPlayers, teams } from "./schema";
import { eq, sql } from "drizzle-orm";

export const getPlayer = cache(async (id: number) => {
  const db = await getDb();

  return db.query.players.findFirst({
    where: eq(players.id, id),
  });
});

export const getTeam = cache(async (id: number) => {
  const db = await getDb();

  return db.query.teams.findFirst({
    where: eq(teams.id, id),
  });
});

export const getIsPlayerStarred = cache(
  async (userId: number, playerId: number) => {
    const db = await getDb();

    const { rows } = await db.execute(sql`
      select exists (
        select 1 from ${starredPlayers} 
        where ${starredPlayers.playerId} = ${playerId}
        and ${starredPlayers.userId} = ${userId}
      ) as starred
    `);

    return !!rows?.[0].starred;
  },
);
