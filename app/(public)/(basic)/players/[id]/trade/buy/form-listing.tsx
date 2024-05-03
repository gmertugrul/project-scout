"use client";

import { NftListing } from "@/app/db/schema";
import { FormEvent, ReactNode, startTransition } from "react";
import { useConfirm, useToast } from "@/app/components/toast";
import { useFormState } from "react-dom";
import {
  cancelListing,
  purchaseListing,
} from "@/app/(public)/(basic)/players/[id]/trade/buy/actions";
import { currencyFormat } from "@/app/lib/helpers";
import Big from "big.js";

export function BuyListingFormWrapper({
  nftListing,
  children,
}: {
  nftListing: NftListing;
  children: ReactNode;
}) {
  const confirm = useConfirm();
  const toast = useToast();

  const wrappedFormAction = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !(await confirm("Are you sure?", {
        description: (
          <>
            This will deduct{" "}
            <strong>
              {currencyFormat.format(Big(nftListing.price).toNumber())} USDT
            </strong>{" "}
            immediately from your credit balance.
          </>
        ),
      }))
    ) {
      return;
    }

    startTransition(() => {
      purchaseListing({}, new FormData(e.target as HTMLFormElement)).then(
        (x) => {
          if (x.success) {
            toast("NFT successfully bought", { variant: "success" });
          } else if (x.error) {
            toast(x.error, { variant: "error" });
          }
        }
      );
    });
  };

  return (
    <form onSubmit={wrappedFormAction}>
      <input type="hidden" name="listingId" value={nftListing.id.toString()} />
      {children}
    </form>
  );
}

export function CancelListingFormWrapper({
  nftListing,
  children,
}: {
  nftListing: NftListing;
  children: ReactNode;
}) {
  const confirm = useConfirm();
  const toast = useToast();

  const wrappedFormAction = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !(await confirm("Are you sure?", {
        description: (
          <>
            This will cancel the sale of this share and return it back to your
            balance.
          </>
        ),
      }))
    ) {
      return;
    }

    startTransition(() => {
      cancelListing({}, new FormData(e.target as HTMLFormElement)).then((x) => {
        if (x.success) {
          toast("Listing canceled", { variant: "success" });
        } else if (x.error) {
          toast(x.error, { variant: "error" });
        }
      });
    });
  };

  return (
    <form onSubmit={wrappedFormAction}>
      <input type="hidden" name="listingId" value={nftListing.id.toString()} />
      {children}
    </form>
  );
}
