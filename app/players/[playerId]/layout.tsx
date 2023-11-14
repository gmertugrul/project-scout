import { NavLink } from "@/app/lib/controls";
import { ReactNode } from "react";

export default async function PlayerLayout({
  params: { playerId },
  children,
}: {
  params: { playerId: string };
  children: ReactNode;
}) {
  return (
    <div>
      <Tabs playerId={playerId} />

      {children}
    </div>
  );
}

function Tabs({ playerId }: { playerId: string }) {
  return (
    <nav className="flex gap-x-0.5 mx-2">
      <NavLink
        className="p-3 shadow-inner rounded-b-lg border border-gray-200 border-t-0 grow text-center text-brand-950 hover:bg-brand-900 hover:bg-opacity-25"
        activeClassName="bg-gray-200 font-medium"
        href={`/players/${playerId}`}
      >
        Statistics
      </NavLink>
      <NavLink
        className="p-3 shadow-inner rounded-b-lg border border-gray-200 border-t-0 grow text-center text-brand-950 hover:bg-brand-900 hover:bg-opacity-25"
        href={`/players/${playerId}/timeline`}
      >
        Timeline
      </NavLink>
      <NavLink
        className="p-3 shadow-inner rounded-b-lg border border-gray-200 border-t-0 grow text-center text-brand-950 hover:bg-brand-900 hover:bg-opacity-25"
        href={`/players/${playerId}/overall`}
      >
        Overall
      </NavLink>
    </nav>
  );
}
