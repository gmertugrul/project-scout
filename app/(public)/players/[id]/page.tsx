import { PlayerHeader } from "../player-header";
import { notFound } from "next/navigation";
import { getPlayer } from "@/app/db/getters";
import { camelCaseToWords, idSchema } from "@/app/lib/helpers";
import { type Player, players } from "@/app/db/schema";
import { getDb } from "@/app/db";
import { eq } from "drizzle-orm";

export default async function PlayerPage({ params }: { params: any }) {
  const { id } = idSchema.parse(params);

  const player = await getPlayer(id);

  if (!player) {
    return notFound();
  }

  return (
    <div className="card m-4">
      <PlayerHeader player={player} />
      <Stats player={player} />
    </div>
  );
}

async function Stats({ player }: { player: Player }) {
  const db = await getDb();

  const playerdata = await db.query.players.findFirst({
    where: eq(players.id, player.id),
    with: {
      goalkeeperStats: true,
      technicalStats: true,
      mentalStats: true,
      physicalStats: true,
    },
  });

  if (!playerdata) return null;

  return (
    <div className="mt-4">
      <div className="flex gap-x-4 overflow-auto pb-4">
        {playerdata.goalkeeperStats &&
        Object.entries(playerdata.goalkeeperStats).find(
          (x) => x[0] != "playerId" && x[1] !== null,
        ) ? (
          <div className="flex flex-col">
            <header className="text-xs text-gray-500 px-2 mb-2">
              Goalkeeper
            </header>
            <StatsColumn stats={playerdata.goalkeeperStats} />
          </div>
        ) : null}

        {playerdata.technicalStats &&
        Object.entries(playerdata.technicalStats).find(
          (x) => x[0] != "playerId" && x[1] !== null,
        ) ? (
          <div className="flex flex-col">
            <header className="text-xs text-gray-500 px-2 mb-2">
              Technical
            </header>
            <StatsColumn stats={playerdata.technicalStats} />
          </div>
        ) : null}

        {playerdata.mentalStats &&
        Object.entries(playerdata.mentalStats).find(
          (x) => x[0] != "playerId" && x[1] !== null,
        ) ? (
          <div className="flex flex-col">
            <header className="text-xs text-gray-500 px-2 mb-2">Mental</header>
            <StatsColumn stats={playerdata.mentalStats} />
          </div>
        ) : null}

        {playerdata.physicalStats &&
        Object.entries(playerdata.physicalStats).find(
          (x) => x[0] != "playerId" && x[1] !== null,
        ) ? (
          <div className="flex flex-col">
            <header className="text-xs text-gray-500 px-2 mb-2">
              Physical
            </header>
            <StatsColumn stats={playerdata.physicalStats} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

function StatsColumn({
  stats,
}: {
  stats: Record<string, number | null | undefined>;
}) {
  return (
    <div className="flex flex-col gap-y-0.5">
      {Object.keys(stats)
        .filter((name) => name != "playerId" && stats[name] !== null)
        .map((name) => (
          <Stat name={name} value={stats[name]} key={name} />
        ))}
    </div>
  );
}

const colors = [
  "bg-red-800",
  "bg-red-800",
  "bg-red-800",
  "bg-orange-800",
  "bg-amber-800",
  "bg-yellow-800",
  "bg-neutral-800",
  "bg-neutral-800",
  "bg-gray-800",
  "bg-slate-800",
  "bg-indigo-800",
  "bg-indigo-800",
  "bg-cyan-800",
  "bg-cyan-800",
  "bg-cyan-800",
  "bg-emerald-800",
  "bg-emerald-800",
  "bg-emerald-800",
  "bg-green-800",
  "bg-green-800",
];

function Stat({
  name,
  value,
}: {
  name: string;
  value: number | null | undefined;
}) {
  value = value || 1;
  const color = colors[Math.max(0, Math.min(19, value - 1))];

  return (
    <span className="flex overflow-hidden">
      <span className="grow text-xs bg-gray-200 text-gray-500 px-2 py-1 whitespace-nowrap">
        {camelCaseToWords(name)}
      </span>
      <span
        className={`${color} w-10 text-center font-semibold px-2 text-white rounded-r`}
      >
        {value}
      </span>
    </span>
  );
}
