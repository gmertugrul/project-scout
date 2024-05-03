import { idSchema } from "@/app/lib/helpers";
import { getPlayer } from "@/app/db/getters";
import { notFound, redirect } from "next/navigation";
import Image from "next/image";
import { getDb } from "@/app/db";
import { eq, sql } from "drizzle-orm";
import { ipos, nftContracts } from "@/app/db/schema";
import { BuyIPOForm } from "./form-ipo";
import { getSessionUser } from "@/app/lib/auth";
import { cookies } from "next/headers";
import { Listings } from "@/app/(public)/(basic)/players/[id]/trade/buy/listings";

export default async function BuyPlayer({ params }: { params: any }) {
  const { id } = idSchema.parse(params);

  const player = await getPlayer(id);

  if (!player) {
    return notFound();
  }

  const user = await getSessionUser(cookies());

  if (!user) {
    return redirect(
      `/login?returnPath=${encodeURIComponent(`/players/${player.id}/trade/buy`)}`
    );
  }

  const db = await getDb();

  const nftContract = await db.query.nftContracts.findFirst({
    where: eq(nftContracts.playerId, player.id),
  });

  if (!nftContract) {
    return redirect(`/players/${player.id}`);
  }

  let ipo = await db.query.ipos.findFirst({
    where: sql`${ipos.nftContractId} = ${nftContract.id} and ${ipos.status} in ('pending', 'active')`,
  });

  if (!ipo && !nftContract.isTradable) {
    return redirect(`/players/${player.id}`);
  }

  return (
    <div className="space-y-6">
      <div className="sm:hidden">
        <h3 className="h3 ml-4 mb-2">Buy Shares</h3>

        <div className="card">
          <div className="grid grid-cols-1 sm:grid-cols-2 max-w-3xl ml-auto mr-auto gap-4">
            <Image
              src={"/images/player-nft.png"}
              alt={"Player NFT"}
              width={686}
              height={984}
              className="w-1/2 sm:w-72 mx-auto"
            />
          </div>
        </div>
      </div>

      {ipo ? (
        <BuyIPOForm player={player} nftContract={nftContract} ipo={ipo} />
      ) : null}

      {nftContract.isTradable ? <Listings nftContract={nftContract} /> : null}
    </div>
  );
}
