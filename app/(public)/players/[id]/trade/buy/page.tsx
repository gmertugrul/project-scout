import { idSchema } from "@/app/lib/helpers";
import { getPlayer } from "@/app/db/getters";
import { notFound, redirect } from "next/navigation";
import Image from "next/image";
import { getDb } from "@/app/db";
import { eq, sql } from "drizzle-orm";
import { ipos, nftContracts } from "@/app/db/schema";
import { BuyForm } from "@/app/(public)/players/[id]/trade/buy/form";

export default async function BuyPlayer({ params }: { params: any }) {
  const { id } = idSchema.parse(params);

  const player = await getPlayer(id);

  if (!player) {
    return notFound();
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

  return (
    <div className="card">
      <div className="grid grid-cols-1 sm:grid-cols-2 max-w-2xl ml-auto mr-auto gap-4">
        <Image
          src={"/images/player-nft.png"}
          alt={"Player NFT"}
          width={686}
          height={984}
          className="w-full sm:w-72"
        />

        <div className="mt-8 sm:mt-24">
          <BuyForm player={player} nftContract={nftContract} ipo={ipo} />
        </div>
      </div>
    </div>
  );
}
