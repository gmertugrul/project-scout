import { WalletIcon } from "@heroicons/react/24/solid";
import { ReactNode } from "react";
import { getUser } from "@/app/lib/auth";
import Big from "big.js";

export async function PageHeader({ children }: { children?: ReactNode }) {
  const user = await getUser();

  return (
    <header className="flex items-center">
      <h2 className="h2">{children}</h2>
      {user ? (
        <span className="ml-auto flex items-center gap-x-2 text-gray-500 text-sm">
          <WalletIcon className="size-4" /> {Big(user.creditBalance).toFixed(2)}{" "}
          USDT
        </span>
      ) : null}
    </header>
  );
}
