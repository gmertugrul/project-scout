import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { getDb } from "@/app/db";
import Link from "next/link";
import { PageHeader } from "@/app/(public)/components/page-header";
import { PlayerInfoCard } from "@/app/(public)/components/player-info-card";
import { ipos, nftBalances, nftContracts, players } from "@/app/db/schema";
import { and, desc, eq, gt } from "drizzle-orm";
import { getSessionUser } from "@/app/lib/auth";
import { cookies } from "next/headers";
import { PlayerHighlightBox, PlayerImageBox } from "../components/player-box";

export default async function Home() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader>Dashboard</PageHeader>

      {/* <div className="rounded bg-brand-800 text-white p-4 space-y-2">
        <h3 className="h3">Project Scout</h3>
        <div className="flex gap-2 ">
          <p className="text-sm text-gray-200">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip.
          </p>

          <div className="bg-brand-700 size-36 rounded shrink-0 grow"></div>
        </div>
      </div> */}

      <IBOList />
      <TrendingList />
    </div>
  );
}

async function IBOList() {
  const db = await getDb();

  const playerList = await db
    .select({
      player: players,
    })
    .from(players)
    .innerJoin(nftContracts, eq(nftContracts.playerId, players.id))
    .innerJoin(ipos, eq(ipos.nftContractId, nftContracts.id))
    .where(eq(ipos.status, "active"))
    .limit(3);

  if (!playerList.length) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2">
      <h3 className="h3">Latest IBOs</h3>

      <div className="grid grid-cols-1 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {playerList.map((p) => (
          <PlayerImageBox player={p.player} key={p.player.id} />
        ))}
      </div>

      <footer className="flex justify-end">
        <Link
          href={`/players/ibos`}
          className="flex items-center justify-center gap-2 py-2 text-sm font-medium text-brand-950 "
        >
          View All <ChevronRightIcon className="size-4" />
        </Link>
      </footer>
    </div>
  );
}

async function TrendingList() {
  const db = await getDb();

  const players = await db.query.players.findMany({
    limit: 4,
  });

  if (!players.length) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2">
      <h3 className="h3 px-4">Trending</h3>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2">
        {players.map((p) => (
          <PlayerHighlightBox player={p} key={p.id} />
        ))}
      </div>

      <footer className="flex justify-end">
        <Link
          href={`/players/ibos`}
          className="flex items-center justify-center gap-2 py-2 text-sm font-medium text-brand-950 "
        >
          View All <ChevronRightIcon className="size-4" />
        </Link>
      </footer>
    </div>
  );
}

async function MyBallersList() {
  const db = await getDb();
  const user = await getSessionUser(cookies());

  if (user == null) return null;

  const playerList = await db
    .select({
      player: players,
    })
    .from(players)
    .innerJoin(nftContracts, eq(nftContracts.playerId, players.id))
    .innerJoin(nftBalances, eq(nftBalances.nftContractId, nftContracts.id))
    .where(
      and(eq(nftBalances.userId, user.id), gt(nftBalances.balance, BigInt(0)))
    )
    .orderBy(desc(nftBalances.balance));

  if (!playerList.length) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2">
      <h3 className="h3 px-4">My Ballers</h3>

      <div className="card bg-gray-100">
        <div className="-m-4 grid grid-cols-1 divide-y divide-gray-200">
          {playerList.map((p) => (
            <div key={p.player.id} className="p-4">
              <PlayerInfoCard player={p.player} />
            </div>
          ))}
        </div>

        <footer className="flex flex-col -mx-4 -mb-4 mt-4 shadow-inner">
          <Link
            href={`/players/my`}
            className="flex items-center justify-center gap-2 bg-opacity-15 bg-brand-900 p-3 text-sm font-medium text-brand-950 "
          >
            View All <ChevronRightIcon className="size-4" />
          </Link>
        </footer>
      </div>
    </div>
  );
}