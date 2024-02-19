import { nftBalances, nftContracts, Player } from "@/app/db/schema";
import Link from "next/link";
import { getSessionUser } from "@/app/lib/auth";
import { cookies } from "next/headers";
import { getDb } from "@/app/db";
import { sql } from "drizzle-orm";
import { getFirst } from "@/app/lib/helpers";

export async function BuySell({ player }: { player: Player }) {
  const user = await getSessionUser(cookies());
  const db = await getDb();

  let canBuy = true;
  let canSell = true;

  if (user) {
    const checkBalance = await db
      .execute<{
        cansell: boolean;
      }>(
        sql`
          select exists(
            select 1 from ${nftBalances} 
            inner join ${nftContracts} on ${nftContracts.id} = ${nftBalances.nftContractId}
            where ${nftBalances.userId} = ${user.id} and 
                  ${nftBalances.balance} > 0 and 
                  ${nftContracts.playerId} = ${player.id}
          ) as cansell`,
      )
      .then((x) => getFirst(x.rows));

    canSell = checkBalance?.cansell ?? false;
  }

  return canBuy || canSell ? (
    <div className="flex mt-4 rounded overflow-hidden absolute bottom-4 left-4 right-4">
      {canBuy ? (
        <Link
          href={`/players/${player.id}/trade/buy`}
          className="grow bg-brand-900 p-3 text-sm font-medium text-white shadow-inner text-center"
        >
          BUY
        </Link>
      ) : null}
      {canSell ? (
        <Link
          href={`/players/${player.id}/trade/sell`}
          className="grow bg-orange-600 p-3 text-sm font-medium text-white shadow-inner text-center"
        >
          SELL
        </Link>
      ) : null}
    </div>
  ) : null;
}
