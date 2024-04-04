import { getPlayer } from "@/app/db/getters";
import { Player, players } from "@/app/db/schema";
import { camelCaseToWords, idSchema } from "@/app/lib/helpers";
import { notFound } from "next/navigation";
import { Tabs } from "../tabs";
import { OverviewChart } from "./client";
import Image from "next/image";
import { getDb } from "@/app/db";
import { eq } from "drizzle-orm";

export default async function PlayerStatsPage({ params }: { params: any }) {
  const { id } = idSchema.parse(params);

  const player = await getPlayer(id);

  if (!player) {
    return notFound();
  }

  return (
    <div className="space-y-4">
      <Stats player={player} />
      <Tabs player={player} />
      <Overview player={player} />
      <StatNumbers player={player} />
    </div>
  );
}

function Stats({ player }: { player: Player }) {
  return (
    <div className="card grid grid-cols-5 gap-8 text-sm">
      <div className="col-span-3 flex flex-col gap-4">
        <div className="relative">
          <Image
            src={"/images/stats-field.png"}
            width={361}
            height={212}
            alt="Field"
            className="w-full h-auto"
          />

          <span className="absolute size-3 -translate-y-1.5 bg-green-600 rounded-full top-[50%] left-[2%]"></span>
          <span className="absolute size-3 -translate-y-1.5 bg-green-600 rounded-full top-[15%] left-[20%]"></span>
          <span className="absolute size-3 -translate-y-1.5 bg-green-600 rounded-full top-[50%] left-[20%]"></span>
          <span className="absolute size-3 -translate-y-1.5 bg-green-600 rounded-full top-[85%] left-[20%]"></span>
          <span className="absolute size-3 -translate-y-1.5 bg-green-600 rounded-full top-[15%] left-[40%]"></span>
          <span className="absolute size-3 -translate-y-1.5 bg-green-600 rounded-full top-[50%] left-[40%]"></span>
          <span className="absolute size-3 -translate-y-1.5 bg-green-600 rounded-full top-[85%] left-[40%]"></span>
          <span className="absolute size-3 -translate-y-1.5 bg-green-600 rounded-full top-[15%] left-[60%]"></span>
          <span className="absolute size-3 -translate-y-1.5 bg-green-600 rounded-full top-[50%] left-[60%]"></span>
          <span className="absolute size-3 -translate-y-1.5 bg-green-600 rounded-full top-[85%] left-[60%]"></span>
          <span className="absolute size-3 -translate-y-1.5 bg-red-600 rounded-full top-[15%] left-[80%]"></span>
          <span className="absolute size-3 -translate-y-1.5 bg-red-600 rounded-full top-[50%] left-[80%]"></span>
          <span className="absolute size-3 -translate-y-1.5 bg-green-600 rounded-full top-[85%] left-[80%]"></span>
        </div>

        <h2 className="font-semibold mt-auto">Target Man Shooter </h2>
        <h2 className="font-semibold">Infiltrator Creator </h2>
      </div>

      <div className="col-span-2 flex flex-col gap-4">
        <div>
          <h2 className="font-semibold">Centre Forward</h2>
          <p className="text-gray-500 text-sm">Main Position</p>
        </div>

        <div>
          <h2 className="font-semibold">Poland</h2>
          <p className="text-gray-500 text-sm">Citizenship</p>
        </div>

        <div>
          <h2 className="font-semibold">Right</h2>
          <p className="text-gray-500 text-sm">Strong Foot</p>
        </div>

        <div>
          <h2 className="font-semibold">Nov, 3 1984 (39)</h2>
          <p className="text-gray-500 text-sm">Birthdate</p>
        </div>
      </div>
    </div>
  );
}

function Overview({ player }: { player: Player }) {
  return (
    <div className="card">
      <OverviewChart />
    </div>
  );
}

async function StatNumbers({ player }: { player: Player }) {
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
    <div>
      <div className="flex gap-x-4 overflow-auto">
        <p className="p-4 grow text-center text-sm text-gray-500 hidden only:block">
          This player does not have any stats
        </p>

        {playerdata.goalkeeperStats &&
        Object.entries(playerdata.goalkeeperStats).find(
          (x) => x[0] != "playerId" && x[1] !== null
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
          (x) => x[0] != "playerId" && x[1] !== null
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
          (x) => x[0] != "playerId" && x[1] !== null
        ) ? (
          <div className="flex flex-col">
            <header className="text-xs text-gray-500 px-2 mb-2">Mental</header>
            <StatsColumn stats={playerdata.mentalStats} />
          </div>
        ) : null}

        {playerdata.physicalStats &&
        Object.entries(playerdata.physicalStats).find(
          (x) => x[0] != "playerId" && x[1] !== null
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
