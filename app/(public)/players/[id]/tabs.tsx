import { Player } from "@/app/db/schema";
import { NavLink } from "@/app/lib/controls";

export function Tabs({ player }: { player: Player }) {
  return (
    <nav>
      <ul className="grid grid-cols-3 bg-gray-100 rounded px-card  text-gray-500 font-medium text-sm">
        <li>
          <NavLink
            className="py-3 block text-center"
            activeClassName="group active text-black font-semibold relative"
            href={`/players/${player.id}`}
            exact
          >
            <span className="group-[.active]:block hidden h-[3px] absolute inset-x-5 bottom-[-2px] bg-brand-900 rounded "></span>
            IBO Metrics
          </NavLink>
        </li>
        <li>
          <NavLink
            className="py-3 block text-center"
            activeClassName="group active text-black font-semibold relative"
            href={`/players/${player.id}/stats`}
            exact
          >
            <span className="group-[.active]:block hidden h-[3px] absolute inset-x-5 bottom-[-2px] bg-brand-900 rounded "></span>
            Statistics
          </NavLink>
        </li>
        <li>
          {" "}
          <NavLink
            className="py-3 block text-center"
            activeClassName="group active text-black font-semibold relative"
            href={`/players/${player.id}/insights`}
            exact
          >
            <span className="group-[.active]:block hidden h-[3px] absolute inset-x-5 bottom-[-2px] bg-brand-900 rounded "></span>
            Scout Insights
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
