import { getDb } from "@/app/db";
import { Player, Team, players } from "@/app/db/schema";
import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import { CreatePlayer } from "./create";
import ResizedImage from "@/app/components/resized-image";

export default async function PlayersAdmin({
  searchParams,
}: {
  searchParams: any;
}) {
  const db = await getDb();

  const playerList = await db.query.players.findMany({
    orderBy: [players.id],
    with: {
      team: true,
    },
  });

  return (
    <div className="space-y-4">
      <CreatePlayer open={"new" in searchParams} />

      <h1 className="h1 flex items-center">
        Players
        <Link
          href="/admin/players?new"
          className="btn-primary ml-auto flex items-center gap-2"
        >
          <PlusIcon className="size-4" /> Create New
        </Link>
      </h1>

      <PlayersTable players={playerList} />
    </div>
  );
}

function PlayersTable({
  players,
}: {
  players: (Player & { team: Team | null })[];
}) {
  return (
    <div className="card p-0">
      <table className="table w-full table-card table-fixed">
        <thead className="thead">
          <tr>
            <th className="th w-full">Name</th>
            <th className="th w-48">Created At</th>
            <th className="th w-32">Team</th>
            <th className="th w-32"></th>
          </tr>
        </thead>
        <tbody className="tbody">
          {!players.length ? (
            <tr>
              <td className="td" colSpan={100}>
                <div className="p-6 text-muted text-center">
                  No players to list.{" "}
                  <a href="/admin/players?new">Create new.</a>
                </div>
              </td>
            </tr>
          ) : null}

          {players.map((player) => (
            <PlayerRow key={player.id} player={player} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PlayerRow({ player }: { player: Player & { team: Team | null } }) {
  return (
    <tr>
      <td className="td">
        <Link
          href={`/admin/players/${player.id}`}
          className="flex items-center"
        >
          {player.portrait ? (
            <ResizedImage
              src={player.portrait}
              alt="Image"
              width={50}
              height={50}
              fit={"crop"}
              className="size-6 -my-1 mr-2 rounded-lg ring-1 ring-brand p-0.5"
            />
          ) : (
            <img
              className="size-6 -my-1 mr-2 rounded-lg ring-1 ring-brand p-0.5"
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                `${player.firstName} ${player.lastName}`
              )}`}
            />
          )}
          {player.firstName} {player.lastName}
        </Link>
      </td>
      <td className="td">{player.createdAt.toLocaleString()}</td>
      <td className="td">
        {player.team?.name ?? <span className="text-muted">None</span>}
      </td>
      <td className="td text-right">
        <Link href={`/admin/players/${player.id}`}>Details</Link>
      </td>
    </tr>
  );
}
