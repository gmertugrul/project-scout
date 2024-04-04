import { PageHeader } from "@/app/(public)/components/page-header";
import { getDb } from "@/app/db";
import { desc, eq } from "drizzle-orm";
import { players, starredPlayers } from "@/app/db/schema";
import { PlayerInfoCard } from "@/app/(public)/components/player-info-card";
import { getSessionUser } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import { clsx } from "clsx";
import { cookies } from "next/headers";
import { PlayerHighlightBox } from "../../components/player-box";

export default async function StarredPlayers() {
  const db = await getDb();
  const user = await getSessionUser(cookies());

  if (user == null)
    return redirect(
      `/login?returnPath=${encodeURIComponent("/players/starred")}`
    );

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

      {!playerList.length ? (
        <p className="p-4 text-center text-gray-500">
          There are currently no starred ballers.
        </p>
      ) : (
        <div
          className={clsx("grid grid-cols-1 gap-2", {
            "xs:grid-cols-2": playerList.length > 1,
          })}
        >
          {playerList.map((p) => (
            <PlayerHighlightBox player={p.player} key={p.player.id} />
          ))}
        </div>
      )}
    </div>
  );
}
