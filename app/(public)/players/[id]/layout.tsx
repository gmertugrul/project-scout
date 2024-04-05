import ResizedImage from "@/app/components/resized-image";
import { getPlayer, getTeam } from "@/app/db/getters";
import { Player, Team } from "@/app/db/schema";
import { idSchema } from "@/app/lib/helpers";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import { BuyModal } from "./client";

export default async function PlayerLayout({
  params,
  children,
}: {
  params: any;
  children: ReactNode;
}) {
  const fields = idSchema.safeParse(params);

  if (!fields.success) {
    return notFound();
  }

  const player = await getPlayer(fields.data.id);

  if (!player) {
    return notFound();
  }

  return (
    <div className="space-y-4">
      <PlayerHeader player={player} />
      {children}
    </div>
  );
}

async function PlayerHeader({ player }: { player: Player }) {
  let team: Team | undefined;

  if (player.teamId) {
    team = await getTeam(player.teamId);
  }

  return (
    <header className="flex items-center">
      <div className="relative">
        <figure className="size-24 ring ring-brand-900 rounded-full overflow-hidden bg-white">
          {player.portrait ? (
            <ResizedImage
              src={player.portrait}
              width={200}
              height={200}
              fit="crop"
              alt="Player"
            />
          ) : (
            <Image
              className="opacity-80"
              alt="Default Player Image"
              src="/images/portrait-default.png"
              width={200}
              height={200}
            />
          )}
        </figure>

        {player.countryCode ? (
          <div
            style={{
              backgroundImage: `url(/images/flags/${player.countryCode.toLowerCase()}.svg)`,
            }}
            className="absolute bg-cover bg-center flex items-center bottom-1 right-1 ring-4 ring-white rounded-full size-5"
          ></div>
        ) : null}
      </div>

      <div className="flex flex-col gap-1 grow ml-8">
        <strong>
          {player.firstName} {player.lastName}
        </strong>
        <span className="text-gray-500">{team?.name}</span>
      </div>
    </header>
  );
}
