import {
  Ipo,
  ipos,
  NftBalance,
  nftBalances,
  NftContract,
  nftContracts,
  Player,
} from "@/app/db/schema";
import {
  PlayerCard,
  PlayerCardItem,
} from "@/app/(public)/components/player-card";
import { ArrowLongDownIcon, ArrowLongUpIcon } from "@heroicons/react/24/solid";
import { getDb } from "@/app/db";
import { and, eq, sql } from "drizzle-orm";
import { getUser } from "@/app/lib/auth";
import { currencyFormat } from "@/app/lib/helpers";

export async function PlayerInfoCard({ player }: { player: Player }) {
  const db = await getDb();

  const nftContract = await db.query.nftContracts.findFirst({
    where: eq(nftContracts.playerId, player.id),
  });

  let ipo: Ipo | undefined;
  let balance: NftBalance | undefined;

  if (nftContract) {
    ipo = await db.query.ipos.findFirst({
      where: sql`${ipos.nftContractId} = ${nftContract.id} and ${ipos.status} in ('pending', 'active')`,
    });

    const user = await getUser();

    if (user) {
      balance = await db.query.nftBalances.findFirst({
        where: and(
          eq(nftBalances.nftContractId, nftContract.id),
          eq(nftBalances.userId, user.id),
        ),
      });
    }
  }

  return (
    <PlayerCard player={player}>
      {ipo ? (
        <IPOCardItems ipo={ipo} nftContract={nftContract!} player={player} />
      ) : null}

      {!ipo && nftContract ? (
        <NFTContractItems nftContract={nftContract} />
      ) : null}

      {balance ? <BalanceCardItems balance={balance} /> : null}
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
  const unitPrice = Number(ipo.unitPrice) / 100;
  const value = Number(BigInt(ipo.totalSupply) * ipo.unitPrice) / 100;

  return (
    <>
      <PlayerCardItem label="Price Per Share">
        {currencyFormat.format(unitPrice)}{" "}
        <span className="font-medium text-xs text-gray-500">USDT</span>
      </PlayerCardItem>
      <PlayerCardItem label="Total Value">
        {currencyFormat.format(value)}{" "}
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
      <PlayerCardItem label="Owned">
        {balance.balance.toFixed(0)}
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
