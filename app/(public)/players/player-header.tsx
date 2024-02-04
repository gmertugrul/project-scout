import Image from "next/image";
import { type Player, Team } from "@/app/db/schema";
import { getTeam } from "@/app/db/getters";
import ResizedImage from "@/app/components/resized-image";

export async function PlayerHeader({ player }: { player: Player }) {
  const age = formatAge(player.birthDate);
  let team: Team | undefined;

  if (player.teamId) {
    team = await getTeam(player.teamId);
  }

  return (
    <header className="flex gap-x-4">
      {player.picture ? (
        <ResizedImage
          className="rounded h-24 w-24"
          src={player.picture}
          width={200}
          height={200}
          fit="crop"
          alt="Player"
        />
      ) : null}

      <div className="flex w-full border-b border-brand-900 border-opacity-10 pb-2">
        <div className="flex flex-col leading-6 justify-between">
          <span className="text-sm text-gray-500 flex items-center">
            {player.countryCode ? (
              <Image
                src={`/images/flags/${player.countryCode.toLowerCase()}.svg`}
                alt="Country flag"
                className="w-4 h-3 mr-1"
                width={40}
                height={30}
              />
            ) : null}
            {player.countryCode ? player.countryCode.toUpperCase() : null}
            {player.countryCode && age ? ", " : null}
            {!!age ? age : ""}
          </span>
          <span className="text-sm text-gray-500 mb-1 uppercase">
            {team?.name}
          </span>
          <span className="font-bold text-gray-700">{player.firstName}</span>
          <span className="font-bold text-gray-700">{player.lastName}</span>
        </div>

        <div className="flex flex-col ml-auto leading-6">
          <span className="font-medium text-gray-500">{player.position}</span>
        </div>
      </div>
    </header>
  );
}

function formatAge(birthday: string | undefined) {
  if (birthday === undefined) return "";
  const ageDifMs = Date.now() - new Date(birthday).getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}
