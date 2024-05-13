"use client";

import { ActionSheet } from "../components/modal";
import { DialogClose } from "@radix-ui/react-dialog";
import { BuySellIcon } from "../components/icons";
import Link from "next/link";
import { useUser } from "../user-context";

export function GlobalActionSheet({
  open,
  onOpenChange,
}: {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const user = useUser();

  const handleOpenChange = (open: boolean) => {
    const footer = document?.getElementById("global-footer");

    if (footer) {
      if (open) {
        footer.style.zIndex = "100";
        footer.style.pointerEvents = "none";
      } else {
        setTimeout(() => {
          footer.style.zIndex = "";
          footer.style.pointerEvents = "";
        }, 300);
      }
    }

    onOpenChange?.(open);
  };

  return (
    <ActionSheet
      open={open}
      onOpenChange={handleOpenChange}
      trigger={
        <span
          className="p-3 bg-brand-900 rounded-full text-white cursor-pointer"
          style={{ boxShadow: "0px 0px 2px 6px rgba(0, 0, 0, 0.1)" }}
        >
          <BuySellIcon className="size-8" />
        </span>
      }
    >
      <div className="flex flex-col gap-6 mb-16">
        <DialogClose asChild>
          <span className="close-handle self-center w-16 h-1.5 bg-gray-300 rounded"></span>
        </DialogClose>

        <div className="grid grid-cols-2 gap-6">
          <DialogClose asChild>
            <Link
              href="/players/buy"
              className="btn btn-white text-center py-4"
            >
              Buy Baller Share
            </Link>
          </DialogClose>

          <DialogClose asChild>
            <Link
              href="/players/sell"
              className="btn btn-white text-center py-4"
            >
              Sell Baller Share
            </Link>
          </DialogClose>
        </div>

        <DialogClose asChild>
          <Link href="/players/my" className="btn btn-white text-center py-4">
            My Listings
          </Link>
        </DialogClose>

        <div className="grid grid-cols-2 gap-6">
          <DialogClose asChild>
            <Link
              href="/me/wallet/deposit"
              className="btn btn-primary text-center"
            >
              Deposit
            </Link>
          </DialogClose>

          <DialogClose asChild>
            <Link
              href="/me/wallet/withdraw"
              className="btn btn-primary text-center"
            >
              Withdraw
            </Link>
          </DialogClose>
        </div>

        {!user ? (
          <div>
            <DialogClose asChild>
              <Link href="/login" className="btn btn-primary text-center block">
                Log In
              </Link>
            </DialogClose>
          </div>
        ) : null}
      </div>
    </ActionSheet>
  );
}
