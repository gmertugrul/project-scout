import { PageHeader } from "@/app/(public)/components/page-header";
import { getDb } from "@/app/db";
import { desc } from "drizzle-orm";
import { ipos } from "@/app/db/schema";
import { PlayerInfoCard } from "@/app/(public)/components/player-info-card";

export default async function IBOs() {
  const db = await getDb();

  const players = await db.query.ipos.findMany({
    orderBy: [desc(ipos.createdAt)],
    with: {
      nftContract: {
        with: {
          player: true,
        },
      },
    },
  });

  return (
    <div className="flex flex-col gap-6">
      <PageHeader>Initial Baller Offering</PageHeader>

      <div className="card">
        {!players.length ? (
          <p className="py-4 text-center text-gray-500">
            There are currently no ongoing IBOs. Please check back later
          </p>
        ) : null}

        <div className="-m-4 grid grid-cols-1 xs:grid-cols-2 divide-x divide-gray-200">
          {players.slice(0, 2).map((p) => (
            <div key={p.id} className="p-4">
              <PlayerInfoCard player={p.nftContract.player} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
