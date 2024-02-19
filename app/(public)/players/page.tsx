import Link from "next/link";
import { PlayerHeader } from "./player-header";
import { getDb } from "@/app/db";
import { type Player, players } from "@/app/db/schema";
import { desc } from "drizzle-orm";
import { PlayerInfoCard } from "@/app/(public)/components/player-info-card";
import { PageHeader } from "@/app/(public)/components/page-header";

export default async function Players() {
  const db = await getDb();

  const playersList = await db.query.players.findMany({
    orderBy: [desc(players.createdAt)],
  });

  return (
    <div className="flex flex-col gap-6">
      <PageHeader>All Ballers</PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {playersList.map((p) => (
          <PlayerDetail player={p} key={p.id} />
        ))}
      </div>
    </div>
  );
}

function PlayerDetail({ player }: { player: Player }) {
  return (
    <div className="card flex flex-col">
      <PlayerInfoCard player={player} />

      <footer className="flex -mx-4 -mb-4 mt-4">
        <Link
          href={`/players/${player.id}/trade/buy`}
          className="text-center grow bg-opacity-80 bg-green-600 p-3 text-sm font-medium text-white shadow-inner"
        >
          BUY
        </Link>
        <Link
          href={`/players/${player.id}/trade/sell`}
          className="text-center grow bg-opacity-80 bg-red-600 p-3 text-sm font-medium text-white shadow-inner"
        >
          SELL
        </Link>
      </footer>
    </div>
  );
}
