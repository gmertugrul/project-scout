import {
  Ipo,
  ipos,
  NftBalance,
  nftBalances,
  NftContract,
  nftContracts,
  nftListings,
  Player,
} from "@/app/db/schema";
import {
  PlayerCard,
  PlayerCardItem,
} from "@/app/(public)/components/player-card";
import {
  ArrowLongDownIcon,
  ArrowLongUpIcon,
  WalletIcon,
} from "@heroicons/react/24/solid";
import { getDb } from "@/app/db";
import { and, avg, count, eq, gt, min, sql } from "drizzle-orm";
import { getSessionUser } from "@/app/lib/auth";
import { currencyFormat, getFirst, numberFormat } from "@/app/lib/helpers";
import { cookies } from "next/headers";
import Big from "big.js";
import { BanknotesIcon } from "@heroicons/react/24/outline";

export async function PlayerInfoCard({ player }: { player: Player }) {
  const db = await getDb();
  const user = await getSessionUser(cookies());

  const nft = await db
    .select()
    .from(nftContracts)
    .leftJoin(ipos, eq(ipos.nftContractId, nftContracts.id))
    .where(eq(nftContracts.playerId, player.id))
    .then(getFirst);

  const nftContract = nft?.nft_contracts;
  const ipo = nft?.ipos;

  let balance: NftBalance | undefined;
  let floor: string | undefined;
  let average: string | undefined;
  let listings: number | undefined;

  if (nftContract) {
    if (user) {
      balance = await db.query.nftBalances.findFirst({
        where: and(
          eq(nftBalances.nftContractId, nftContract.id),
          eq(nftBalances.userId, user.id),
          gt(nftBalances.balance, BigInt(0)),
        ),
      });
    }

    const listingData = await db
      .select({
        min: min(nftListings.price),
        avg: avg(nftListings.price),
        count: count(nftListings.id),
      })
      .from(nftListings)
      .where(
        and(
          eq(nftListings.nftContractId, nftContract.id),
          eq(nftListings.status, "active"),
        ),
      )
      .then(getFirst);

    if (typeof listingData?.min == "string") {
      floor = listingData.min;
    }

    if (typeof listingData?.avg == "string") {
      average = listingData.avg;
    }

    if (listingData?.count) {
      listings = listingData.count;
    }
  }

  return (
    <PlayerCard player={player} user={user}>
      {balance ? <BalanceCardItems balance={balance} /> : null}

      {listings ? (
        <PlayerCardItem label="Listings">
          {numberFormat.format(listings)}
        </PlayerCardItem>
      ) : null}

      {ipo?.status == "active" ? (
        <IPOCardItems ipo={ipo} nftContract={nftContract!} player={player} />
      ) : null}

      {nftContract?.isTradable ? (
        <NFTContractItems nftContract={nftContract} />
      ) : null}

      {floor ? (
        <PlayerCardItem
          label="Floor Price"
          image={<BanknotesIcon className="size-4" />}
        >
          {currencyFormat.format(Big(floor).toNumber())}{" "}
          <span className="font-medium text-xs text-gray-500">USDT</span>
        </PlayerCardItem>
      ) : null}

      {average ? (
        <PlayerCardItem
          label="Average Price"
          image={<BanknotesIcon className="size-4" />}
        >
          {currencyFormat.format(Big(average).toNumber())}{" "}
          <span className="font-medium text-xs text-gray-500">USDT</span>
        </PlayerCardItem>
      ) : null}
    </PlayerCard>
  );
}

function IPOCardItems({
  ipo,
}: {
  ipo: Ipo;
  nftContract: NftContract;
  player: Player;
}) {
  const unitPrice = Big(ipo.unitPrice);
  const value = Big(ipo.totalSupply).mul(Big(ipo.unitPrice));

  return (
    <>
      <PlayerCardItem label="Price Per Share">
        {currencyFormat.format(unitPrice.toNumber())}{" "}
        <span className="font-medium text-xs text-gray-500">USDT</span>
      </PlayerCardItem>
      <PlayerCardItem label="Total Value">
        {currencyFormat.format(value.toNumber())}{" "}
        <span className="font-medium text-xs text-gray-500">USDT</span>
      </PlayerCardItem>
      <PlayerCardItem label="Total Supply">
        {ipo.totalSupply.toFixed(0)}
      </PlayerCardItem>
    </>
  );
}

function BalanceCardItems({ balance }: { balance: NftBalance }) {
  return (
    <>
      <PlayerCardItem label="Owned" image={<WalletIcon className="size-4" />}>
        {balance.balance.toString()}
      </PlayerCardItem>
    </>
  );
}

function NFTContractItems({ nftContract }: { nftContract: NftContract }) {
  return (
    <>
      <PlayerCardItem
        label="Daily Change"
        image={<ArrowLongUpIcon className="size-4 text-green-700" />}
      >
        <span className="text-green-700">13.5%</span>
      </PlayerCardItem>
      <PlayerCardItem
        label="Weekly Change"
        image={<ArrowLongDownIcon className="size-4 text-red-700" />}
      >
        <span className="text-red-700">1.5%</span>
      </PlayerCardItem>
    </>
  );
}
