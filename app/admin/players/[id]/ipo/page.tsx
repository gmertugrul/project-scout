import { getFirst, idSchema } from "@/app/lib/helpers";
import { getPlayer } from "@/app/db/getters";
import { notFound } from "next/navigation";
import { getDb } from "@/app/db";
import { ipos, nftContracts, players } from "@/app/db/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { IpoEditor } from "@/app/admin/players/[id]/ipo/editor";

export default async function IpoAdmin({ params }: { params: any }) {
  const { id } = idSchema.parse(params);

  const db = await getDb();

  const row = await db
    .select()
    .from(players)
    .where(eq(players.id, id))
    .leftJoin(nftContracts, eq(players.id, nftContracts.playerId))
    .leftJoin(ipos, eq(nftContracts.id, ipos.nftContractId))
    .limit(1)
    .then(getFirst);

  if (!row) {
    return notFound();
  }

  if (!row.nft_contracts) {
    return (
      <div className="card text-sm bg-blue-50">
        <div className="text-muted text-center">
          There is no NFT Contract configured for this player. Please set up an{" "}
          <Link href={`/admin/players/${row.players.id}/nft`}>
            NFT Contract
          </Link>{" "}
          first.
        </div>
      </div>
    );
  }

  return (
    <IpoEditor
      player={row.players}
      contract={row.nft_contracts}
      ipo={row.ipos}
    />
  );
}
