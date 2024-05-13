import { getDb } from "@/app/db";
import { type Player, players } from "@/app/db/schema";
import { desc } from "drizzle-orm";
import { PageHeader } from "@/app/(public)/components/page-header";
import { PlayerHighlightBox } from "@/app/(public)/components/player-box";

export default async function PlayerSell() {
  const db = await getDb();

  const playersList = await db.query.players.findMany({
    orderBy: [desc(players.createdAt)],
  });

  return (
    <>
      <PageHeader>Sell Baller Shares</PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {playersList.map((p) => (
          <PlayerHighlightBox
            player={p}
            key={p.id}
            mapHref={(p) => `/players/${p.id}/sell`}
          />
        ))}
      </div>
    </>
  );
}
