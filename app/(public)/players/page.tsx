import Link from "next/link";
import { PlayerHeader } from "./player-header";
import { getDb } from "@/app/db";
import { type Player, players } from "@/app/db/schema";
import { desc } from "drizzle-orm";

export default async function Players() {
  const db = await getDb();

  const playersList = await db.query.players.findMany({
    orderBy: [desc(players.createdAt)],
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {playersList.map((p) => (
        <PlayerDetail player={p} key={p.id} />
      ))}
    </div>
  );
}

function PlayerDetail({ player }: { player: Player }) {
  return (
    <div className="card flex flex-col">
      <PlayerHeader player={player} />

      <main className="flex justify-between mt-4 px-2">
        <div className="flex flex-col">
          <span className="text-xs text-gray-400">Floor</span>
          <span className="text-gray-500 font-medium">$50.00</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-gray-400">Volume</span>
          <span className="text-gray-500 font-medium">$500K</span>
        </div>
      </main>

      <footer className="flex flex-col -mx-4 -mb-4 mt-4">
        <Link
          href={`/players/${player.id}`}
          className="text-center bg-opacity-25 bg-brand-900 p-3 text-sm font-medium text-brand-950 shadow-inner"
        >
          Statistics
        </Link>
        <div className="flex w-full ">
          <button className="grow bg-opacity-80 bg-green-600 p-3 text-sm font-medium text-white shadow-inner">
            BUY
          </button>
          <button className="grow bg-opacity-80 bg-red-600 p-3 text-sm font-medium text-white shadow-inner">
            SELL
          </button>
        </div>
      </footer>
    </div>
  );
}
