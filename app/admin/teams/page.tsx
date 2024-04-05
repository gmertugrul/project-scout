import { getDb } from "@/app/db";
import { Team, teams } from "@/app/db/schema";
import { PlusIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { CreateTeam } from "./create";
import { countries } from "@/app/lib/countries";
import ResizedImage from "@/app/components/resized-image";

export default async function TeamsAdmin({
  searchParams = {},
}: {
  searchParams?: any;
}) {
  const db = await getDb();

  const teamsList = await db.query.teams.findMany({
    orderBy: [teams.id],
  });

  return (
    <div className="space-y-4">
      <CreateTeam open={"new" in searchParams} />

      <h1 className="h1 flex items-center">
        Teams
        <Link
          href="/admin/teams?new"
          className="btn-primary ml-auto flex items-center gap-2"
        >
          <PlusIcon className="size-4" /> Create New
        </Link>
      </h1>

      <TeamsTable teams={teamsList} />
    </div>
  );
}

function TeamsTable({ teams }: { teams: Team[] }) {
  return (
    <div className="card p-0">
      <table className="table w-full table-card table-fixed">
        <thead className="thead">
          <tr>
            <th className="th w-full">Name</th>
            <th className="th w-48">Abbreviation</th>
            <th className="th w-32">Country</th>
            <th className="th w-32"></th>
          </tr>
        </thead>
        <tbody className="tbody">
          {!teams.length ? (
            <tr>
              <td className="td" colSpan={100}>
                <div className="p-6 text-muted text-center">
                  No teams to list. <a href="/admin/teams?new">Create new.</a>
                </div>
              </td>
            </tr>
          ) : null}

          {teams.map((team) => (
            <TeamRow key={team.id} team={team} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TeamRow({ team }: { team: Team }) {
  return (
    <tr>
      <td className="td">
        <div className="flex items-center">
          {team.picture ? (
            <ResizedImage
              src={team.picture}
              alt="Image"
              width={50}
              height={50}
              fit={"crop"}
              className="size-6 mr-2 rounded-lg ring-1 ring-brand p-0.5"
            />
          ) : (
            <img
              className="size-6 -my-1 mr-2 rounded-lg ring-1 ring-brand p-0.5"
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(team.name)}`}
            />
          )}
          {team.name}
        </div>
      </td>
      <td className="td">
        {team.abbreviation ?? <span className="text-muted">None</span>}
      </td>
      <td className="td">
        {team.countryCode ? (
          countries.find((x) => x.code == team.countryCode)?.name ?? (
            <span className="text-muted">None</span>
          )
        ) : (
          <span className="text-muted">None</span>
        )}
      </td>
      <td className="td text-right">
        <div className="flex items-center justify-end gap-4">
          <Link className="btn-text" href={`/admin/teams/${team.id}`}>
            Edit
          </Link>
        </div>
      </td>
    </tr>
  );
}
