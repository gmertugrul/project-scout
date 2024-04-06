import ResizedImage from "@/app/components/resized-image";
import { getIsPlayerStarred, getTeam } from "@/app/db/getters";
import { Player, Team } from "@/app/db/schema";
import { getSessionUser } from "@/app/lib/auth";
import { ArrowUpCircleIcon, StarIcon } from "@heroicons/react/24/solid";
import { cookies } from "next/headers";
import Link from "next/link";
import Image from "next/image";
import { toggleStar } from "./actions";
import clsx from "clsx";

export async function PlayerImageBox({ player }: { player: Player }) {
  const user = await getSessionUser(cookies());

  let team: Team | undefined;
  let starred = false;

  if (player.teamId) {
    team = await getTeam(player.teamId);
  }

  if (user != null) {
    starred = await getIsPlayerStarred(user.id, player.id);
  }

  return (
    <div className="relative border-b-4 rounded-lg px-3 py-4 hover:border-b-brand-600 border-b-brand-900 shadow-[0px_1px_8px_rgba(110,110,110,0.1)]">
      {user ? (
        <form action={toggleStar}>
          <input type="hidden" name="id" value={player.id} />
          <button type="submit" className="absolute top-4 right-1">
            <StarIcon
              className={clsx(
                "size-6 drop-shadow",
                { "text-gray-600 opacity-20": !starred },
                { "text-yellow-400": starred }
              )}
            />
          </button>
        </form>
      ) : null}

      <Link href={`/players/${player.id}`}>
        <header className="flex flex-col">
          <strong className="font-bold font-sm">{player.firstName}</strong>
          <span className="font-light">{player.lastName}</span>
        </header>

        <div className="relative flex justify-end -mr-3 -my-4 pl-6">
          {team?.picture ? (
            <ResizedImage
              className="absolute h-auto w-1/4 max-w-16 left-0 top-8"
              src={team?.picture}
              width={100}
              height={100}
              fit="cover"
              alt="Team"
            />
          ) : null}

          {player.picture ? (
            <ResizedImage
              src={player.picture}
              width={400}
              height={400}
              fit="crop"
              alt="Player"
            />
          ) : (
            <Image
              className="opacity-80"
              alt="Default Player Image"
              src="/images/picture-default.png"
              width={200}
              height={200}
            />
          )}
        </div>
      </Link>
    </div>
  );
}

export async function PlayerHighlightBox({ player }: { player: Player }) {
  let team: Team | undefined;

  if (player.teamId) {
    team = await getTeam(player.teamId);
  }

  return (
    <Link
      href={`/players/${player.id}`}
      className="border-b-4 rounded-lg hover:border-b-brand-600 border-b-brand-900 shadow-[0px_1px_8px_rgba(110,110,110,0.1)]"
    >
      <header
        style={{ backgroundImage: "url(/images/fractal-bg.svg)" }}
        className="relative bg-cover flex justify-end h-[80px]"
      >
        {team?.picture ? (
          <div className="absolute h-auto w-1/4 max-w-10 left-2 top-2 p-1.5 shadow bg-white rounded-full flex items-center justify-center">
            <ResizedImage
              src={team?.picture}
              width={100}
              height={100}
              fit="cover"
              alt="Team"
            />
          </div>
        ) : null}

        {player.picture ? (
          <ResizedImage
            className="aspect-square w-auto mt-1"
            src={player.picture}
            width={400}
            height={400}
            fit="crop"
            alt="Player"
          />
        ) : (
          <Image
            className="aspect-square w-auto mt-1 opacity-50"
            alt="Default Player Image"
            src="/images/picture-default.png"
            width={400}
            height={400}
          />
        )}

        <span className="bg-gray-300/50 absolute inset-x-0 bottom-0 text-sm font-bold px-2">
          {player.firstName} {player.lastName}
        </span>
      </header>

      <div className="px-3 space-y-2 py-4">
        <div className="text-sm grid grid-cols-2">
          <span>Floor</span>
          <strong className="text-right">114 USDT</strong>
        </div>
        <div className="text-sm grid grid-cols-2">
          <span>Change</span>
          <strong className="justify-end text-green-700 flex items-center gap-1">
            <ArrowUpCircleIcon className="size-4" /> 12%
          </strong>
        </div>
      </div>
    </Link>
  );
}
