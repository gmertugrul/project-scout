import { cache } from "react";
import { getDb } from ".";
import {
  Ipo,
  ipos,
  NftContract,
  nftContracts,
  players,
  starredPlayers,
  teams,
} from "./schema";
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

export const getPlayerTradeInfo = cache(
  async (playerId: number): Promise<{ ipo?: Ipo; nft?: NftContract }> => {
    let result: { ipo?: Ipo; nft?: NftContract } = {};

    const db = await getDb();

    const nftContract = await db.query.nftContracts.findFirst({
      where: eq(nftContracts.playerId, playerId),
    });

    if (nftContract != null) {
      if (nftContract.isTradable) {
        result.nft = nftContract;
      }

      const ipo = await db.query.ipos.findFirst({
        where: eq(ipos.nftContractId, nftContract.id),
      });

      if (ipo && (ipo.status == "active" || ipo.status == "pending"))
        result.ipo = ipo;
    }

    return result;
  },
);
