import { Player } from "@/app/db/schema";
import Link from "next/link";

export function BuySell({ player }: { player: Player }) {
  return (
    <div className="flex mt-4 rounded overflow-hidden absolute bottom-4 left-4 right-4">
      <Link
        href={`/players/${player.id}/trade/buy`}
        className="grow bg-brand-900 p-3 text-sm font-medium text-white shadow-inner text-center"
      >
        BUY
      </Link>
      <button className="grow bg-orange-600 p-3 text-sm font-medium text-white shadow-inner">
        SELL
      </button>
    </div>
  );
}
