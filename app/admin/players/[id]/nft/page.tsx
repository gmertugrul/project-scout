import { getFirst, idSchema } from "@/app/lib/helpers";
import { notFound } from "next/navigation";
import { NftEditor } from "@/app/admin/players/[id]/nft/editor";
import { getDb } from "@/app/db";
import { eq } from "drizzle-orm";
import { nftContracts, players } from "@/app/db/schema";
import { Nfts } from "@/app/admin/players/[id]/nft/nfts";

export default async function PlayerNft({ params }: { params: any }) {
  const { id } = idSchema.parse(params);

  const db = await getDb();

  const row = await db
    .select()
    .from(players)
    .where(eq(players.id, id))
    .leftJoin(nftContracts, eq(players.id, nftContracts.playerId))
    .limit(1)
    .then(getFirst);

  if (!row) {
    return notFound();
  }

  return (
    <div className="flex flex-col gap-4">
      <NftEditor player={row.players} contract={row.nft_contracts} />
      <Nfts player={row.players} contract={row.nft_contracts} />
    </div>
  );
}
