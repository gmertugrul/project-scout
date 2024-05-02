"use client";

import { ActionSheet } from "../components/modal";
import { DialogClose } from "@radix-ui/react-dialog";
import { BuySellIcon } from "../components/icons";
import Link from "next/link";

export function GlobalActionSheet({
  open,
  onOpenChange,
}: {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
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
      <div className="flex flex-col gap-8 mb-16">
        <DialogClose asChild>
          <span className="close-handle self-center w-16 h-1.5 bg-gray-300 rounded"></span>
        </DialogClose>

        <DialogClose asChild>
          <Link href="/players" className="btn btn-white text-center py-4">
            Buy Baller Share
          </Link>
        </DialogClose>

        <DialogClose asChild>
          <Link href="/players/my" className="btn btn-white text-center py-4">
            My Listings
          </Link>
        </DialogClose>

        <div className="grid grid-cols-2 gap-10">
          <DialogClose asChild>
            <Link href="/players/my" className="btn btn-primary text-center">
              Deposit
            </Link>
          </DialogClose>

          <DialogClose asChild>
            <Link href="/players/my" className="btn btn-primary text-center">
              Withdraw
            </Link>
          </DialogClose>
        </div>
      </div>
    </ActionSheet>
  );
}