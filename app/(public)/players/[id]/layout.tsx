import { NavLink } from "@/app/lib/controls";
import { ReactNode } from "react";
import Link from "next/link";
import { idSchema } from "@/app/lib/helpers";
import { getPlayer } from "@/app/db/getters";
import { notFound } from "next/navigation";
import { Player } from "@/app/db/schema";

export default async function PlayerLayout({
  params,
  children,
}: {
  params: any;
  children: ReactNode;
}) {
  const { id } = idSchema.parse(params);

  const player = await getPlayer(id);

  if (!player) {
    return notFound();
  }

  return (
    <div className="pb-14">
      <Tabs id={id} />
      {children}
    </div>
  );
}

function Tabs({ id }: { id: number }) {
  return (
    <nav className="grid grid-cols-3 gap-x-[1px] -m-4 mb-4 px-4">
      <NavLink
        className="p-2 shadow-inner rounded-b border border-gray-200 border-t-0 text-center text-brand-950"
        activeClassName="bg-brand-900 shadow-none text-white font-medium"
        href={`/players/${id}`}
        exact
      >
        Profile
      </NavLink>
      <NavLink
        className="p-2 shadow-inner rounded-b border border-gray-200 border-t-0 text-center text-brand-950"
        activeClassName="bg-brand-900 shadow-none text-white font-medium"
        href={`/players/${id}/timeline`}
      >
        Timeline
      </NavLink>
      <NavLink
        className="p-2 shadow-inner rounded-b border border-gray-200 border-t-0 text-center text-brand-950"
        activeClassName="bg-brand-900 shadow-none text-white font-medium"
        href={`/players/${id}/trade`}
      >
        Trade
      </NavLink>
    </nav>
  );
}
