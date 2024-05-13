import { getPlayer } from "@/app/db/getters";
import { type Player } from "@/app/db/schema";
import { idSchema } from "@/app/lib/helpers";
import {
  BanknotesIcon,
  CurrencyDollarIcon,
  WalletIcon,
} from "@heroicons/react/24/outline";
import { notFound } from "next/navigation";
import { BuyModal, IBOActiveChart, IBOCounter } from "./client";
import { Tabs } from "./tabs";

export default async function PlayerPage({ params }: { params: any }) {
  const { id } = idSchema.parse(params);

  const player = await getPlayer(id);

  if (!player) {
    return notFound();
  }

  return (
    <div className="space-y-4">
      <IBOInfoCard player={player} />
      <Tabs player={player} />
      <IBOMetrics player={player} />
      <IBOActiveMetrics player={player} />
      <BuyModal player={player} />
    </div>
  );
}

async function IBOInfoCard({ player }: { player: Player }) {
  return (
    <div className="card grid grid-cols-2 items-center">
      <h2 className="font-semibold">IBO Price</h2>
      <p className="text-gray-500 text-sm text-right">
        <strong>100.000</strong> USDT
      </p>

      <hr className="col-span-2 my-4 -mx-card" />

      <h2 className="font-semibold">Total Shares</h2>
      <p className="text-gray-500 text-sm text-right">1000</p>

      <hr className="col-span-2 my-4 -mx-card" />

      <h2 className="font-semibold">Price Per Share</h2>
      <p className="text-gray-500 text-sm text-right">
        <strong>100</strong> USDT
      </p>
    </div>
  );
}

async function IBOMetrics({ player }: { player: Player }) {
  const target = new Date("2024-08-23T23:59:59Z");

  return (
    <div className="card grid grid-cols-2 items-center">
      <div className="col-span-2">
        <IBOCounter target={target} />
      </div>

      <hr className="col-span-2 my-4 -mx-card" />

      <h2 className="font-semibold flex items-center gap-2">
        <BanknotesIcon className="size-4" /> Allocation
      </h2>
      <p className="text-gray-500 text-sm text-right">1000</p>

      <hr className="col-span-2 my-4 -mx-card" />

      <h2 className="font-semibold flex items-center gap-2">
        <CurrencyDollarIcon className="size-4" /> Allocation Cost
      </h2>
      <p className="text-gray-500 text-sm text-right">
        <strong>5000</strong> USDT
      </p>

      <hr className="col-span-2 my-4 -mx-card" />

      <h2 className="font-semibold flex items-center gap-2">
        <WalletIcon className="size-4" /> Balance
      </h2>
      <p className="text-green-600 text-sm text-right">
        <strong>4550</strong> USDT
      </p>
    </div>
  );
}

async function IBOActiveMetrics({ player }: { player: Player }) {
  return (
    <div className="card grid grid-cols-3 items-center gap-8">
      <div>
        <IBOActiveChart />
      </div>

      <div className="col-span-2 flex flex-col">
        <h2 className="font-semibold">IBO Time</h2>
        <p className="text-gray-500 text-sm">2 days, 14 hours, 23 minutes</p>

        <hr className="col-span-2 my-2" />

        <h2 className="font-semibold">IBO Holders</h2>
        <p className="text-gray-500 text-sm">167</p>
      </div>
    </div>
  );
}
