import { getPlayer, getTeam } from "@/app/db/getters";
import { idSchema } from "@/app/lib/helpers";
import { notFound } from "next/navigation";
import { Tabs } from "../tabs";
import { Player, Team } from "@/app/db/schema";
import ResizedImage from "@/app/components/resized-image";
import Image from "next/image";
import { BuyModal } from "../client";
import { PlusIcon } from "@heroicons/react/24/solid";

export default async function SellPlayer({ params }: { params: any }) {
  const { id } = idSchema.parse(params);

  const player = await getPlayer(id);

  if (!player) {
    return notFound();
  }

  return (
    <div className="space-y-4">
      <SellInfoCard player={player} />
      <Tabs player={player} />
      <CreateListing player={player} />
      <ListedShares player={player} />
    </div>
  );
}

async function SellInfoCard({ player }: { player: Player }) {
  return (
    <div className="card grid grid-cols-2 items-center">
      <h2 className="font-semibold">Market Price</h2>
      <p className="text-gray-500 text-sm text-right">
        <strong>88.00</strong> USDT
      </p>

      <hr className="col-span-2 my-4 -mx-card" />

      <h2 className="font-semibold">Owned Shares</h2>
      <p className="text-gray-500 text-sm text-right">
        <strong>4</strong> shares
      </p>

      <hr className="col-span-2 my-4 -mx-card" />

      <h2 className="font-semibold">Total Value</h2>
      <p className="text-gray-500 text-sm text-right">
        <strong>352.00</strong> USDT
      </p>
    </div>
  );
}

async function CreateListing({ player }: { player: Player }) {
  return (
    <div className="group border border-dashed rounded-xl border-brand-800 px-card py-card-sm flex items-center cursor-pointer hover:border-brand-500 hover:text-brand-800">
      <span className="bg-white ring-1 ring-gray-200 shadow-lg p-2 rounded-full group-hover:bg-brand-900 group-hover:text-white text-brand-800 transition-all">
        <PlusIcon className="h-6 w-6" />
      </span>
      <span className="grow text-center">Create New Listing</span>
    </div>
  );
}

async function ListedShares({ player }: { player: Player }) {
  const list = [98.33, 99.1, 104.1, 120, 120, 180];

  return (
    <div className="flex flex-col gap-2">
      {list.map((x) => (
        <div key={x} className="card flex items-center gap-3">
          <ListedShareHeader player={player} />
          <div className="border-l border-gray-300 h-8 -my-3"></div>
          <span className="font-bold text-brand-900 text-lg grow text-center">
            {x.toFixed(2)} USDT
          </span>
          <div className="border-l border-gray-300 h-8 -my-3"></div>
          <button className="btn-danger">Cancel</button>
        </div>
      ))}
    </div>
  );
}

async function ListedShareHeader({ player }: { player: Player }) {
  let team: Team | undefined;

  if (player.teamId) {
    team = await getTeam(player.teamId);
  }

  return (
    <header className="flex items-center">
      <div className="relative">
        <figure className="size-6 ring-1 ring-brand-900 rounded-full overflow-hidden bg-white">
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
      </div>

      <div className="flex flex-col grow ml-2 text-sm">
        <strong>
          {player.firstName} {player.lastName}
        </strong>
        <span className="text-gray-500 text-xs -mt-1">{team?.name}</span>
      </div>
    </header>
  );
}
