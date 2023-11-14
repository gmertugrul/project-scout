import Image from "next/image";
import { PlayerHeader } from "./player-header";

export default async function Players() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <Player />
      <Player />
      <Player />
      <Player />
    </div>
  );
}

export function Player() {
  return (
    <div className="card flex flex-col !md:flex-row !md:justify-between">
      <PlayerHeader />

      <main className="flex justify-between mt-4 px-2">
        <div className="flex flex-col">
          <span className="text-xs text-gray-400">Floor</span>
          <span className="text-gray-500 font-medium">$50.00</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-gray-400">Volume</span>
          <span className="text-gray-500 font-medium">$500K</span>
        </div>
      </main>

      <footer className="flex flex-col -mx-4 -mb-4 mt-4">
        <button className="bg-opacity-25 bg-brand-900 p-3 text-sm font-medium text-brand-950 shadow-inner">
          Statistics
        </button>
        <div className="flex w-full ">
          <button className="grow bg-opacity-80 bg-green-600 p-3 text-sm font-medium text-white shadow-inner">
            BUY
          </button>
          <button className="grow bg-opacity-80 bg-red-600 p-3 text-sm font-medium text-white shadow-inner">
            SELL
          </button>
        </div>
      </footer>
    </div>
  );
}