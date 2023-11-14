import Image from "next/image";
import { PlayerFragment } from "../lib/gql-sdk";

export function PlayerHeader({ player }: { player: PlayerFragment }) {
  return (
    <header className="flex gap-x-4">
      <img
        className="rounded w-24 h-24"
        src={`${player.attributes?.photo.data?.attributes?.url}`}
        alt="Player"
      />

      <div className="flex w-full border-b border-brand-900 border-opacity-10 pb-2">
        <div className="flex flex-col leading-6 justify-between">
          <span className="text-sm text-gray-500 flex items-center">
            <Image
              src={`/images/flags/${
                player.attributes?.country?.data?.attributes?.code?.toLowerCase() ??
                "tr"
              }.svg`}
              alt="Country flag"
              className="w-4 h-3 mr-1"
              width={40}
              height={30}
            />
            {player.attributes?.country?.data?.attributes?.code},{" "}
            {age(player.attributes?.birthdate)}
          </span>
          <span className="text-sm text-gray-500 mb-1 uppercase">
            {player.attributes?.team?.data?.attributes?.name}
          </span>
          <span className="font-bold text-gray-700">
            {player.attributes?.first_name}
          </span>
          <span className="font-bold text-gray-700">
            {player.attributes?.last_name}
          </span>
        </div>

        <div className="flex flex-col ml-auto leading-6">
          <span className="font-medium text-gray-500">
            {player.attributes?.position}
          </span>
        </div>
      </div>
    </header>
  );
}

function age(birthday: string | undefined) {
  if (birthday === undefined) return "";

  var ageDifMs = Date.now() - new Date(birthday).getTime();
  var ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}
