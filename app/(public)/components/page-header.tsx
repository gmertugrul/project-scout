import { WalletIcon } from "@heroicons/react/24/solid";
import { ReactNode } from "react";
import { getUser } from "@/app/lib/auth";

export async function PageHeader({ children }: { children?: ReactNode }) {
  const user = await getUser();

  return (
    <header className="flex items-center">
      <h2 className="h2">{children}</h2>
      {user ? (
        <span className="ml-auto flex items-center gap-x-2 text-gray-500 text-sm">
          <WalletIcon className="size-4" /> 122 USDT
        </span>
      ) : null}
    </header>
  );
}
