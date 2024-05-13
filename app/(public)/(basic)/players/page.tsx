import Link from "next/link";
import { getDb } from "@/app/db";
import { type Player, players } from "@/app/db/schema";
import { desc } from "drizzle-orm";
import { PlayerInfoCard } from "@/app/(public)/components/player-info-card";
import { PageHeader } from "@/app/(public)/components/page-header";
import { PlayerHighlightBox } from "../../components/player-box";
import { NavLink } from "@/app/lib/controls";

export default async function Players() {
  const db = await getDb();

  const playersList = await db.query.players.findMany({
    orderBy: [desc(players.createdAt)],
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-center py-4">
        <Tabs />
      </div>

      <PageHeader>Baller Market</PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {playersList.map((p) => (
          <PlayerHighlightBox player={p} key={p.id} />
        ))}
      </div>
    </div>
  );
}

function Tabs() {
  return (
    <nav className="flex items-center">
      <div className="relative pb-5">
        <div className="flex w-[270px]">
          <NavLink href="/players" className="px-3 w-1/2 relative group">
            <span className="group-[.active]:font-bold group-[.active]:text-brand-800">
              BUY
            </span>
            <span className="absolute hidden group-[.active]:block inset-x-0 -bottom-5 h-2 bg-brand-800 shadow rounded z-10"></span>
          </NavLink>
          <NavLink href="#" className="px-3 w-1/2 text-right">
            <span className="group-[.active]:font-bold group-[.active]:text-brand-800">
              SELL
            </span>

            <span className="absolute hidden group-[.active]:block inset-x-0 -bottom-5 h-2 bg-brand-800 shadow rounded z-10"></span>
          </NavLink>
        </div>

        <span className="absolute inset-x-0 bottom-0 h-2 bg-brand-100 rounded"></span>
      </div>
    </nav>
  );
}
