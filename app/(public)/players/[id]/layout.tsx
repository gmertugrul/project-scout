import { NavLink } from "@/app/lib/controls";
import { ReactNode } from "react";
import { getFirst, idSchema } from "@/app/lib/helpers";
import { getPlayer } from "@/app/db/getters";
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
} from "@/app/db/schema";

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
    <div className="pb-14">
      <Tabs player={player} />
      {children}
    </div>
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
          eq(nftBalances.userId, user.id),
        ),
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
