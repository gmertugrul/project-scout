import { PageHeader } from "@/app/(public)/components/page-header";
import { getDb } from "@/app/db";
import { desc, eq } from "drizzle-orm";
import { ipos, nftContracts, players } from "@/app/db/schema";
import { PlayerImageBox } from "../../components/player-box";

export default async function IBOs() {
  const db = await getDb();

  const playerList = await db
    .select({
      player: players,
    })
    .from(players)
    .innerJoin(nftContracts, eq(nftContracts.playerId, players.id))
    .innerJoin(ipos, eq(ipos.nftContractId, nftContracts.id))
    .where(eq(ipos.status, "active"));

  return (
    <div className="flex flex-col gap-6">
      <PageHeader>Initial Baller Offering</PageHeader>

      {!playerList.length ? (
        <p className="py-4 text-center text-gray-500">
          There are currently no ongoing IBOs. Please check back later
        </p>
      ) : (
        <div className="grid grid-cols-1 xs:grid-cols-2 gap-2">
          {playerList.map((p) => (
            <PlayerImageBox key={p.player.id} player={p.player} />
          ))}
        </div>
      )}
    </div>
  );
}
