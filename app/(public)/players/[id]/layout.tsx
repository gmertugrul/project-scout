import { NavLink } from "@/app/lib/controls";
import { ReactNode } from "react";
import { getFirst, idSchema } from "@/app/lib/helpers";
import { getPlayer, getTeam } from "@/app/db/getters";
import { notFound } from "next/navigation";
import { getSessionUser } from "@/app/lib/auth";
import { cookies } from "next/headers";
import { getDb } from "@/app/db";
import { and, eq, sql } from "drizzle-orm";
import {
  ipos,
  nftBalances,
  nftContracts,
  nftListings,
  Player,
  Team,
} from "@/app/db/schema";
import Image from "next/image";
import ResizedImage from "@/app/components/resized-image";

export default async function PlayerLayout({
  params,
  children,
}: {
  params: any;
  children: ReactNode;
}) {
  const fields = idSchema.safeParse(params);

  if (!fields.success) {
    return notFound();
  }

  const player = await getPlayer(fields.data.id);

  if (!player) {
    return notFound();
  }

  return (
    <div className="space-y-4">
      <PlayerHeader player={player} />
      {children}
    </div>
  );
}

async function PlayerHeader({ player }: { player: Player }) {
  let team: Team | undefined;

  if (player.teamId) {
    team = await getTeam(player.teamId);
  }

  return (
    <header className="flex items-center">
      <div className="relative">
        <figure className="size-24 ring ring-brand-900 rounded-full overflow-hidden bg-white">
          {player.portrait ? (
            <ResizedImage
              src={player.portrait}
              width={200}
              height={200}
              fit="crop"
              alt="Player"
            />
          ) : (
            <Image
              className="opacity-80"
              alt="Default Player Image"
              src="/images/portrait-default.png"
              width={200}
              height={200}
            />
          )}
        </figure>

        {player.countryCode ? (
          <div
            style={{
              backgroundImage: `url(/images/flags/${player.countryCode.toLowerCase()}.svg)`,
            }}
            className="absolute bg-cover bg-center flex items-center bottom-1 right-1 ring-4 ring-white rounded-full size-5"
          ></div>
        ) : null}
      </div>

      <div className="flex flex-col gap-1 grow ml-8">
        <strong>
          {player.firstName} {player.lastName}
        </strong>
        <span className="text-gray-500">{team?.name}</span>
      </div>
    </header>
  );
}

async function Tabs({ player }: { player: Player }) {
  const user = await getSessionUser(cookies());
  const db = await getDb();

  let canBuy = true;
  let canSell = true;

  if (user) {
    const contractStatus = await db
      .select({
        isTradable: nftContracts.isTradable,
        hasIpo: sql<boolean>`${ipos.status} = 'active'`,
      })
      .from(nftContracts)
      .leftJoin(ipos, eq(ipos.nftContractId, nftContracts.id))
      .where(eq(nftContracts.playerId, player.id))
      .then(getFirst);

    const balance = await db
      .select({ balance: nftBalances.balance })
      .from(nftBalances)
      .innerJoin(nftContracts, eq(nftContracts.id, nftBalances.nftContractId))
      .where(
        and(
          eq(nftContracts.playerId, player.id),
          eq(nftBalances.userId, user.id)
        )
      )
      .then(getFirst);

    canBuy =
      (contractStatus?.hasIpo ?? false) ||
      (contractStatus?.isTradable ?? false);

    canSell = !!balance && balance.balance > 0;
  }

  return (
    <nav className="grid grid-flow-col gap-x-[1px] -m-4 mb-8 px-4">
      <NavLink
        className="p-2 shadow-inner rounded-b border border-gray-200 border-t-0 text-center text-brand-950"
        activeClassName="bg-brand-900 shadow-none text-white font-medium"
        href={`/players/${player.id}`}
        exact
      >
        Profile
      </NavLink>
      <NavLink
        className="p-2 shadow-inner rounded-b border border-gray-200 border-t-0 text-center text-brand-950"
        activeClassName="bg-brand-900 shadow-none text-white font-medium"
        href={`/players/${player.id}/timeline`}
      >
        Timeline
      </NavLink>
      {canBuy ? (
        <NavLink
          className="p-2 shadow-inner rounded-b border border-gray-200 border-t-0 text-center text-brand-950"
          activeClassName="bg-brand-900 shadow-none text-white font-medium"
          href={`/players/${player.id}/trade/buy`}
        >
          Buy
        </NavLink>
      ) : null}
      {canSell ? (
        <NavLink
          className="p-2 shadow-inner rounded-b border border-gray-200 border-t-0 text-center text-brand-950"
          activeClassName="bg-brand-900 shadow-none text-white font-medium"
          href={`/players/${player.id}/trade/sell`}
        >
          Sell
        </NavLink>
      ) : null}
    </nav>
  );
}
