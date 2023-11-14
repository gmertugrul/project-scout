import { NavLink } from "@/app/lib/controls";
import { PlayerHeader } from "../player-header";
import { getGQL } from "@/app/lib/gql";
import { notFound } from "next/navigation";
import { PlayerFragment } from "@/app/lib/gql-sdk";
import {
  mentalStatNames,
  physicalStatNames,
  technicalStatNames,
} from "@/app/lib/stats";

export default async function Player({
  params: { playerId },
}: {
  params: { playerId: string };
}) {
  const sdk = getGQL();
  const player = await sdk.player({ id: playerId });

  if (!player.player?.data) {
    return notFound();
  }

  return (
    <div className="card m-4">
      <PlayerHeader player={player.player?.data} />

      <Stats player={player.player.data} />
    </div>
  );
}

function Stats({ player }: { player: PlayerFragment }) {
  return (
    <div className="mt-4">
      <div className="flex gap-x-4 overflow-auto pb-4">
        {player.attributes?.technical_stats ? (
          <div className="flex flex-col">
            <header className="text-xs text-gray-500 px-2 mb-2">
              Technical
            </header>
            <StatsColumn
              stats={player.attributes.technical_stats as any}
              names={technicalStatNames}
            />
          </div>
        ) : null}

        {player.attributes?.mental_stats ? (
          <div className="flex flex-col">
            <header className="text-xs text-gray-500 px-2 mb-2">Mental</header>
            <StatsColumn
              stats={player.attributes.mental_stats as any}
              names={mentalStatNames}
            />
          </div>
        ) : null}

        {player.attributes?.physical_stats ? (
          <div className="flex flex-col">
            <header className="text-xs text-gray-500 px-2 mb-2">
              Physical
            </header>
            <StatsColumn
              stats={player.attributes.physical_stats as any}
              names={physicalStatNames}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

function StatsColumn({
  stats,
  names,
}: {
  stats: Record<string, number | null | undefined>;
  names: string[];
}) {
  return (
    <div className="flex flex-col gap-y-0.5">
      {names.map((name) => (
        <Stat name={name} value={stats[name]} key={name} />
      ))}
    </div>
  );
}

const titleCase = (s: string) =>
  s
    .replace(/^[-_]*(.)/, (_, c) => c.toUpperCase())
    .replace(/[-_]+(.)/g, (_, c) => " " + c.toUpperCase());

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
        {titleCase(name)}
      </span>
      <span
        className={`${color} w-10 text-center font-semibold px-2 text-white rounded-r`}
      >
        {value}
      </span>
    </span>
  );
}
