"use client";

import { Ipo, NftContract, Player } from "@/app/db/schema";
import { useState } from "react";
import { currencyFormat } from "@/app/lib/helpers";
import { useFormState } from "react-dom";
import { purchaseIPO } from "@/app/(public)/players/[id]/trade/buy/actions";

export function BuyForm({
  player,
  nftContract,
  ipo,
}: {
  player: Player;
  nftContract: NftContract;
  ipo?: Ipo;
}) {
  const [state, formAction] = useFormState(purchaseIPO, null);
  const [amount, setAmount] = useState(BigInt(1));

  if (state?.balance) {
    return (
      <div className="flex flex-col items-center gap-4">
        <h2 className="h2">Congratulations!</h2>
        <p className="text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip.
        </p>
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-4" action={formAction}>
      <input type="hidden" name="ipoId" value={ipo!.id} />
      <div className="relative">
        <span className="absolute left-[2px] top-[2px] bottom-[2px] justify-center flex items-center text-sm font-medium bg-gray-200 rounded w-28">
          Amount:
        </span>
        <input
          type="number"
          name="amount"
          min={0}
          step={1}
          className="input pl-32"
          defaultValue={1}
          onChange={(x) => {
            if (/^\d+$/.test(x.target.value)) {
              setAmount(BigInt(x.target.value));
            } else {
              setAmount(BigInt(0));
            }
          }}
        />
      </div>
      <div className="relative">
        <span className="absolute left-[2px] top-[2px] bottom-[2px] justify-center flex items-center text-sm font-medium bg-gray-200 rounded w-28">
          Total Price:
        </span>

        <span className="input pointer-events-none pl-32">
          {currencyFormat.format(amount * ipo!.unitPrice)} USDT
        </span>
      </div>

      <button
        disabled={!(amount > 0)}
        className="rounded bg-brand-900 p-2 text-sm font-medium text-white shadow-inner disabled:opacity-60"
      >
        Buy
      </button>

      {state?.errors?.amount ? (
        <p className="font-light text-sm text-red-700 text-center">
          {state.errors.amount.join(", ")}
        </p>
      ) : null}

      {state?.error ? (
        <p className="font-light text-sm text-red-700 text-center">
          {state.error}
        </p>
      ) : null}

      {amount > 0 ? (
        <p className="font-light text-sm text-gray-500 text-center">
          You will need to pay{" "}
          <strong>{currencyFormat.format(amount * ipo!.unitPrice)}</strong> USDT
          from your balance in order to purchase{" "}
          <strong>{amount.toString()}</strong> piece{amount > 1 ? "s" : ""} of
          this NFT.
        </p>
      ) : (
        <p className="font-light text-sm text-gray-500 text-center">
          Please enter a valid amount to purchase this NFT
        </p>
      )}
    </form>
  );
}
