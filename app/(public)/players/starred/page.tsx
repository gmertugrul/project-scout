import { PageHeader } from "@/app/(public)/components/page-header";
import { getDb } from "@/app/db";
import { desc, eq } from "drizzle-orm";
import { players, starredPlayers } from "@/app/db/schema";
import { PlayerInfoCard } from "@/app/(public)/components/player-info-card";
import { getUser } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import { clsx } from "clsx";

export default async function StarredPlayers() {
  const db = await getDb();
  const user = await getUser();

  if (user == null)
    return redirect(`/login?return=${encodeURIComponent("/players/starred")}`);

  const playerList = await db
    .select({
      player: players,
    })
    .from(players)
    .innerJoin(starredPlayers, eq(players.id, starredPlayers.playerId))
    .where(eq(starredPlayers.userId, user.id))
    .orderBy(desc(starredPlayers.createdAt));

  return (
    <div className="flex flex-col gap-6">
      <PageHeader>My Starred Ballers</PageHeader>

      <div className="card">
        {!playerList.length ? (
          <p className="p-4 text-center text-gray-500">
            There are currently no starred ballers.
          </p>
        ) : (
          <div
            className={clsx("-m-4 grid grid-cols-1 divide-x divide-gray-200", {
              "xs:grid-cols-2": playerList.length > 1,
            })}
          >
            {playerList.map((p) => (
              <div key={p.player.id} className="p-4">
                <PlayerInfoCard player={p.player} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
