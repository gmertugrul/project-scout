import { PageHeader } from "@/app/(public)/components/page-header";
import { NavLink } from "@/app/lib/controls";

export default async function PlayerMarketLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-center py-4">
        <Tabs />
      </div>

      {children}
    </div>
  );
}

function Tabs() {
  return (
    <nav className="flex items-center">
      <div className="relative pb-5">
        <div className="flex w-[270px]">
          <NavLink href="/players/buy" className="px-3 w-1/2 relative group">
            <span className="group-[.active]:font-bold group-[.active]:text-brand-800">
              BUY
            </span>
            <span className="absolute hidden group-[.active]:block inset-x-0 -bottom-5 h-2 bg-brand-800 shadow rounded z-10"></span>
          </NavLink>
          <NavLink
            href="/players/sell"
            className="px-3 w-1/2 text-right relative group"
          >
            <span className="group-[.active]:font-bold group-[.active]:text-brand-800">
              SELL
            </span>

            <span className="absolute hidden group-[.active]:block inset-x-0 -bottom-5 h-2 bg-brand-800 shadow rounded z-10"></span>
          </NavLink>
        </div>

        <span className="absolute inset-x-0 bottom-0 h-2 bg-brand-100 rounded"></span>
      </div>
    </nav>
  );
}
