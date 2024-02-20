"use client";

import { NftBalance, NftContract, Player } from "@/app/db/schema";
import { FormEvent, startTransition, useState } from "react";
import Big from "big.js";
import { useFormState } from "react-dom";
import { sell } from "@/app/(public)/players/[id]/trade/sell/actions";
import { currencyFormat } from "@/app/lib/helpers";
import { useConfirm } from "@/app/components/toast";

export function SellForm({
  player,
  nftContract,
  balance,
}: {
  player: Player;
  nftContract: NftContract;
  balance?: bigint;
}) {
  const confirm = useConfirm();

  const [state, formAction] = useFormState(sell, null);

  const max = balance ?? BigInt(0);

  const [amount, setAmount] = useState(BigInt(1));
  const [price, setPrice] = useState(Big(100));

  const wrappedFormAction = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !(await confirm("Are you sure?", {
        description: (
          <>
            This will create a listing for <strong>{amount.toString()}</strong>{" "}
            shares immediately. You can cancel the listings before they can be
            purchased by other users.
          </>
        ),
      }))
    ) {
      return state;
    }

    startTransition(() => {
      formAction(new FormData(e.target as HTMLFormElement));
    });
  };

  return (
    <form onSubmit={wrappedFormAction} className="flex flex-col gap-4">
      <input type="hidden" name="nftContractId" value={nftContract.id} />

      <div className="flex items-center">
        <span className="input font-medium text-sm py-2 rounded-r-none bg-gray-200 flex items-center text-gray-500 w-40 shrink-0 justify-center">
          Shares
        </span>
        <input
          type="text"
          name="amount"
          defaultValue={amount.toString()}
          onChange={(x) => {
            try {
              const na = BigInt(x.target.value);
              if (na <= 0) setAmount(BigInt(0));
              else setAmount(na);
            } catch {
              setAmount(BigInt(0));
            }
          }}
          className="input rounded-l-none -ml-[1px]"
        />
      </div>

      <span className="-mt-3 font-medium text-xs text-gray-500 text-right mr-3">
        Max: {max.toString()}
      </span>

      <div className="flex items-center">
        <span className="input font-medium text-sm py-2 rounded-r-none bg-gray-200 flex items-center text-gray-500 w-40 shrink-0 justify-center">
          Price per Share
        </span>
        <input
          type="text"
          name="price"
          defaultValue={price.toFixed(2)}
          onChange={(x) => {
            try {
              const np = Big(x.target.value);
              if (np.lte(0)) setPrice(Big(0));
              else setPrice(np);
            } catch {
              setPrice(Big(0));
            }
          }}
          className="input rounded-l-none -ml-[1px]"
        />
      </div>

      <span className="-mt-3 font-medium text-xs text-gray-500 text-right mr-3">
        Current floor: 11.10 USDT
      </span>

      <button
        disabled={amount <= BigInt(0) || amount > max || price.eq(0)}
        className="rounded-md bg-brand-900 p-2 text-sm font-medium text-white shadow-inner disabled:opacity-60"
      >
        Create Listing
      </button>

      {state?.errors?.amount ? (
        <p className="font-light text-sm text-red-700 text-center">
          {state.errors.amount.join(", ")}
        </p>
      ) : null}

      {state?.errors?.price ? (
        <p className="font-light text-sm text-red-700 text-center">
          {state.errors.price.join(", ")}
        </p>
      ) : null}

      {state?.error ? (
        <p className="font-light text-sm text-red-700 text-center">
          {state.error}
        </p>
      ) : null}

      {!(amount <= BigInt(0) || amount > max || price.eq(0)) ? (
        <p className="font-light text-sm text-gray-500 text-center">
          You will be listing <strong>{amount.toString()}</strong> share
          {amount > 1 ? "s" : ""} (of <strong>{max.toString()}</strong> total)
          at <strong>{currencyFormat.format(price.toNumber())} USDT</strong>{" "}
          each. The shares will be available for purchase individually. Upon
          completion of this sale, you will receive{" "}
          <strong>
            {currencyFormat.format(
              Big(amount.toString()).mul(price).toNumber(),
            )}{" "}
            USDT
          </strong>{" "}
          in total.
        </p>
      ) : null}
    </form>
  );
}
