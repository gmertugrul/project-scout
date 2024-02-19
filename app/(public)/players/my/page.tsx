import { PageHeader } from "@/app/(public)/components/page-header";
import { getDb } from "@/app/db";
import { and, desc, eq, gt } from "drizzle-orm";
import {
  nftBalances,
  nftContracts,
  players,
  starredPlayers,
} from "@/app/db/schema";
import { PlayerInfoCard } from "@/app/(public)/components/player-info-card";
import { getSessionUser } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import { clsx } from "clsx";
import { cookies } from "next/headers";

export default async function MyPlayers() {
  const db = await getDb();
  const user = await getSessionUser(cookies());

  if (user == null)
    return redirect(`/login?returnPath=${encodeURIComponent("/players/my")}`);

  const playerList = await db
    .select({
      player: players,
    })
    .from(players)
    .innerJoin(nftContracts, eq(nftContracts.playerId, players.id))
    .innerJoin(nftBalances, eq(nftBalances.nftContractId, nftContracts.id))
    .where(
      and(eq(nftBalances.userId, user.id), gt(nftBalances.balance, BigInt(0))),
    )
    .orderBy(desc(nftBalances.balance));

  return (
    <div className="flex flex-col gap-6">
      <PageHeader>My Ballers</PageHeader>

      <div className="card">
        {!playerList.length ? (
          <p className="p-4 text-center text-gray-500">
            You currently have no baller shares.
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
