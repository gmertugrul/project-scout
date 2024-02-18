import { notFound } from "next/navigation";
import { PlayerHeader } from "../../player-header";
import { Entry } from "./entry";
import { idSchema } from "@/app/lib/helpers";
import { getPlayer } from "@/app/db/getters";
import { getDb } from "@/app/db";
import { desc, eq } from "drizzle-orm";
import { posts } from "@/app/db/schema";
import { BuySell } from "@/app/(public)/players/components";

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
    <>
      <div className="card">
        <PlayerHeader player={player} />

        <div className="space-y-4 divide-y divide-gray-200 mt-4 border-t border-gray-200">
          {entries.map((e) => (
            <Entry entry={e} key={e.id} />
          ))}
        </div>
      </div>
      <BuySell player={player} />
    </>
  );
}
