import { notFound } from "next/navigation";
import { Entry } from "./entry";
import { idSchema } from "@/app/lib/helpers";
import { getPlayer } from "@/app/db/getters";
import { getDb } from "@/app/db";
import { desc, eq } from "drizzle-orm";
import { posts } from "@/app/db/schema";
import { PlayerInfoCard } from "@/app/(public)/components/player-info-card";

export default async function PlayerOverall({ params }: { params: any }) {
  const { id } = idSchema.parse(params);

  const db = await getDb();
  const player = await getPlayer(id);

  if (!player) {
    return notFound();
  }

  const entries = await db.query.posts.findMany({
    where: eq(posts.playerId, player.id),
    orderBy: desc(posts.createdAt),
  });

  return (
    <div className="space-y-4">
      <div className="card">
        <PlayerInfoCard player={player} />
      </div>

      <div className="card">
        <div className="space-y-4 divide-y divide-gray-200">
          {!entries.length ? (
            <p className="p-4 text-center text-sm text-gray-500">
              This player does not have any timeline entries
            </p>
          ) : null}

          {entries.map((e) => (
            <Entry entry={e} key={e.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
