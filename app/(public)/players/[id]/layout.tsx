import { NavLink } from "@/app/lib/controls";
import { ReactNode } from "react";

export default async function PlayerLayout({
  params: { id },
  children,
}: {
  params: { id: string };
  children: ReactNode;
}) {
  return (
    <div>
      <Tabs id={id} />

      {children}
    </div>
  );
}

function Tabs({ id }: { id: string }) {
  return (
    <nav className="flex gap-x-0.5 mx-2">
      <NavLink
        className="p-3 shadow-inner rounded-b-lg border border-gray-200 border-t-0 grow text-center text-brand-950 hover:bg-brand-900 hover:bg-opacity-25"
        activeClassName="bg-gray-200 font-medium"
        href={`/players/${id}`}
        exact
      >
        Statistics
      </NavLink>
      <NavLink
        className="p-3 shadow-inner rounded-b-lg border border-gray-200 border-t-0 grow text-center text-brand-950 hover:bg-brand-900 hover:bg-opacity-25"
        activeClassName="bg-gray-200 font-medium"
        href={`/players/${id}/timeline`}
      >
        Timeline
      </NavLink>
      <NavLink
        className="p-3 shadow-inner rounded-b-lg border border-gray-200 border-t-0 grow text-center text-brand-950 hover:bg-brand-900 hover:bg-opacity-25"
        activeClassName="bg-gray-200 font-medium"
        href={`/players/${id}/overall`}
      >
        Overall
      </NavLink>
    </nav>
  );
}
