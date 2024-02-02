import { cache } from "react";
import { getDb } from ".";
import { players, teams } from "./schema";
import { eq } from "drizzle-orm";

export const getPlayer = cache(async (id: number) => {
  const db = await getDb();

  const player = await db.query.players.findFirst({
    where: eq(players.id, id),
  });

  return player;
});

export const getTeam = cache(async (id: number) => {
  const db = await getDb();

  const team = await db.query.teams.findFirst({
    where: eq(teams.id, id),
  });

  return team;
});
