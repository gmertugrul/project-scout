import Link from "next/link";
import { getDb } from "@/app/db";
import { type Player, players } from "@/app/db/schema";
import { desc } from "drizzle-orm";
import { PlayerInfoCard } from "@/app/(public)/components/player-info-card";
import { PageHeader } from "@/app/(public)/components/page-header";
import { PlayerHighlightBox } from "../components/player-box";

export default async function Players() {
  const db = await getDb();

  const playersList = await db.query.players.findMany({
    orderBy: [desc(players.createdAt)],
  });

  return (
    <div className="flex flex-col gap-6">
      <PageHeader>Baller Market</PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {playersList.map((p) => (
          <PlayerHighlightBox player={p} key={p.id} />
        ))}
      </div>
    </div>
  );
}
