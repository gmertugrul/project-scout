import { ClipboardIcon, ShareIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default async function DepositPage() {
  return (
    <div>
      <h3 className="h3 mb-6">Deposit USDT</h3>

      <div className="flex flex-col gap-2 items-center">
        <Image
          src="/images/temp/qr.svg"
          alt="Deposit USDT"
          width={200}
          height={200}
        />

        <span className="text-sm text-gray-500 my-2 border border-gray-500 rounded p-2 w-full text-center">
          bc1q0fuhmpurlya0wsyc72ccfyr5f3ndd3dqkqjc70
        </span>

        <div className="flex items-center gap-2">
          <button className="btn-white text-brand-800 font-bold">
            <ShareIcon className="size-6" />
          </button>

          <button className="btn-white text-brand-800 font-bold flex items-center gap-1">
            <ClipboardIcon className="size-6" />
            <span>Copy Address</span>
          </button>
        </div>

        <span className="text-sm text-gray-500 my-2 text-center">
          Send only tokens from Bitcoin network. Sending from another network
          may result in permanent loss of your tokens.
        </span>
      </div>
    </div>
  );
}
