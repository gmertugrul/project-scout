import { Player, Team, User } from "@/app/db/schema";
import ResizedImage from "@/app/components/resized-image";
import Image from "next/image";
import { getIsPlayerStarred, getTeam } from "@/app/db/getters";
import { ReactNode } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { toggleStar } from "@/app/(public)/components/actions";
import { clsx } from "clsx";

export async function PlayerCard({
  player,
  user,
  children,
  className,
}: {
  player: Player;
  user?: User;
  children?: ReactNode;
  className?: string;
}) {
  let team: Team | undefined;
  let starred = false;

  if (player.teamId) {
    team = await getTeam(player.teamId);
  }

  if (user != null) {
    starred = await getIsPlayerStarred(user.id, player.id);
  }

  return (
    <div className={`@container relative ${className}`}>
      {user ? (
        <form action={toggleStar}>
          <input type="hidden" name="id" value={player.id} />
          <button
            type="submit"
            className="absolute top-1 left-1 @xs:left-auto @xs:right-1"
          >
            <StarIcon
              className={clsx(
                "size-8 drop-shadow",
                { "text-gray-600 opacity-40": !starred },
                { "text-yellow-400": starred },
              )}
            />
          </button>
        </form>
      ) : null}

      <Link href={`/players/${player.id}`}>
        <div className="flex flex-col gap-4 @xs:flex-row @xs:items-center">
          {player.picture ? (
            <ResizedImage
              className="rounded w-full aspect-square h-auto @xs:size-20"
              src={player.picture}
              width={200}
              height={200}
              fit="crop"
              alt="Player"
            />
          ) : (
            <img
              className="rounded w-full h-auto @xs:size-20"
              alt="Player"
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(`${player.firstName} ${player.lastName}`)}&size=500`}
            />
          )}

          <div className="flex flex-col gap-2 w-full">
            <div className="flex items-center gap-2">
              <div className="size-6 ring-1 ring-gray-100 flex items-center justify-center rounded-full">
                {player.countryCode ? (
                  <Image
                    src={`/images/flags/${player.countryCode.toLowerCase()}.svg`}
                    alt="Country flag"
                    className="size-4"
                    width={40}
                    height={40}
                  />
                ) : null}
              </div>

              <span className="font-bold text-brand-950">
                {player.firstName} {player.lastName}
              </span>
            </div>

            {team ? (
              <PlayerCardItem
                label="Team"
                image={
                  team.picture ? (
                    <ResizedImage
                      src={team.picture}
                      alt={team.name}
                      className="size-4"
                      width={40}
                      height={40}
                    />
                  ) : undefined
                }
              >
                <span className="font-medium">{team.name}</span>
              </PlayerCardItem>
            ) : (
              <PlayerCardItem label="Team">
                <span className="font-medium text-gray-500">None</span>
              </PlayerCardItem>
            )}

            <div className="flex flex-col gap-2 @xs:hidden">{children}</div>
          </div>
        </div>

        <div className="hidden @xs:grid grid-cols-2 gap-2 mt-2">{children}</div>
      </Link>
    </div>
  );
}

export function PlayerCardItem({
  label,
  children,
  image,
}: {
  label?: ReactNode;
  children?: ReactNode;
  image?: ReactNode;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="size-6 ring-1 ring-gray-100 flex items-center justify-center rounded-full bg-white">
        {image ?? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            fill="none"
            viewBox="0 0 15 15"
          >
            <path
              fill="#00452C"
              d="M14.54 6.108H7.942V2.544a2.911 2.911 0 012.46 2.873.45.45 0 10.899 0 3.808 3.808 0 00-3.804-3.805.45.45 0 00-.45.45v4.051h-6C1.69 3.135 4.336.9 7.496.9a.45.45 0 000-.9C3.364 0 0 3.365 0 7.5v.942c0 .246.199.45.45.45h6.597v4.051a.45.45 0 10.9 0v-4.05h6.001c-.638 2.972-3.285 5.207-6.445 5.207a.45.45 0 000 .9C11.636 15 15 11.635 15 7.5v-.942a.45.45 0 00-.45-.45h-.01zM.9 7.992V7.5c0-.167.005-.33.02-.492h6.127v.984H.9zm7.047 0v-.984h6.148V7.5c0 .167-.005.33-.021.492H7.947z"
            ></path>
          </svg>
        )}
      </div>

      <div className="flex flex-col leading-tight">
        {label ? (
          <label className="text-sm font-light text-gray-600 -mb-0.5">
            {label}
          </label>
        ) : null}
        <span className="font-normal text-sm text-brand-900">{children}</span>
      </div>
    </div>
  );
}
