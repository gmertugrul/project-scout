import { NavLink } from "@/app/lib/controls";
import {
  Bars4Icon,
  ChartBarIcon,
  PuzzlePieceIcon,
  UserIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import { ReactNode } from "react";
import { notFound } from "next/navigation";
import { getPlayer } from "@/app/db/getters";
import { idSchema } from "@/app/lib/helpers";
import ResizedImage from "@/app/components/resized-image";

export default async function PlayerAdminLayout({
  params,
  children,
}: {
  params: any;
  children: ReactNode;
}) {
  const { id } = idSchema.parse(params);
  const player = await getPlayer(id);

  if (!player) return notFound();

  return (
    <div className="grid grid-cols-4 gap-8">
      <div className="mt-2">
        {player.portrait ? (
          <div className="p-1 bg-white rounded ring-1 ring-gray-300 mb-8">
            <ResizedImage
              className="w-full"
              alt="Player Image"
              src={player.portrait}
              width={500}
              height={500}
              fit="cover"
            />
          </div>
        ) : null}

        <SideNav playerId={id} />
      </div>

      <div className="col-span-3 space-y-4">
        <h1 className="h1">
          {player.firstName} {player.lastName}
        </h1>

        {children}
      </div>
    </div>
  );
}

function SideNavLink({
  href,
  children,
  exact,
}: {
  href: string;
  children: ReactNode;
  exact?: boolean;
}) {
  return (
    <li>
      <NavLink
        passiveClassName="text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
        activeClassName="bg-gray-50 text-indigo-600 border-gray-300"
        className="border border-transparent group flex items-center gap-x-2 rounded-md p-2 text-sm leading-6 font-semibold"
        href={href}
        exact={exact}
      >
        {children}
      </NavLink>
    </li>
  );
}

function SideNav({ playerId }: { playerId: number }) {
  return (
    <nav className="flex flex-1 flex-col" aria-label="Sidebar">
      <ul role="list" className="space-y-1">
        <SideNavLink href={`/admin/players/${playerId}`} exact>
          <UserIcon className="size-4" /> General
        </SideNavLink>
        <SideNavLink href={`/admin/players/${playerId}/stats`}>
          <ChartBarIcon className="size-4" /> Stats
        </SideNavLink>
        <SideNavLink href={`/admin/players/${playerId}/feed`}>
          <Bars4Icon className="size-4" /> Newsfeed
        </SideNavLink>
        <SideNavLink href={`/admin/players/${playerId}/nft`}>
          <PuzzlePieceIcon className="size-4" /> NFT Settings
        </SideNavLink>
        <SideNavLink href={`/admin/players/${playerId}/ipo`}>
          <GlobeAltIcon className="size-4" /> Public Offering
        </SideNavLink>
      </ul>
    </nav>
  );
}
