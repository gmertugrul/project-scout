import { cache } from "react";
import { getDb } from ".";
import { players, teams } from "./schema";
import { eq } from "drizzle-orm";

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
