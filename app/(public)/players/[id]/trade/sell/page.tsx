import { idSchema } from "@/app/lib/helpers";
import { getPlayer } from "@/app/db/getters";
import { notFound, redirect } from "next/navigation";
import { PlayerInfoCard } from "@/app/(public)/components/player-info-card";
import { getSessionUser } from "@/app/lib/auth";
import { cookies } from "next/headers";
import { getDb } from "@/app/db";
import { and, eq } from "drizzle-orm";
import { nftBalances, nftContracts } from "@/app/db/schema";
import { SellForm } from "@/app/(public)/players/[id]/trade/sell/form-sell";

export default async function SellPlayer({ params }: { params: any }) {
  const { id } = idSchema.parse(params);

  const player = await getPlayer(id);

  if (!player) {
    return notFound();
  }

  const user = await getSessionUser(cookies());

  if (!user) {
    return redirect(
      `/login?returnPath=${encodeURIComponent(`/players/${player.id}/trade/sell`)}`,
    );
  }

  const db = await getDb();

  const nftContract = await db.query.nftContracts.findFirst({
    where: eq(nftContracts.playerId, player.id),
  });

  if (!nftContract) {
    return redirect(`/players/${player.id}`);
  }

  const balance = await db.query.nftBalances.findFirst({
    where: and(
      eq(nftBalances.nftContractId, nftContract.id),
      eq(nftBalances.userId, user.id),
    ),
  });

  return (
    <div className="space-y-4">
      <div className="card">
        <PlayerInfoCard player={player} />
      </div>

      <div className="card">
        <h3 className="h3 mb-4">Sell Shares</h3>
        <SellForm player={player} nftContract={nftContract} balance={balance} />
      </div>
    </div>
  );
}
