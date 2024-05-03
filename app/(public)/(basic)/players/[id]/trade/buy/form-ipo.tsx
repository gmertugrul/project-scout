"use client";

import { Ipo, NftContract, Player } from "@/app/db/schema";
import { FormEvent, startTransition, useCallback, useState } from "react";
import { currencyFormat } from "@/app/lib/helpers";
import { useFormState } from "react-dom";
import { purchaseIPO } from "@/app/(public)/(basic)/players/[id]/trade/buy/actions";
import Big from "big.js";
import { redirect } from "next/navigation";
import { useUser } from "@/app/user-context";
import { WalletIcon } from "@heroicons/react/24/solid";
import { useConfirm, useToast } from "@/app/components/toast";

export function BuyIPOForm({
  player,
  nftContract,
  ipo,
}: {
  player: Player;
  nftContract: NftContract;
  ipo: Ipo;
}) {
  const user = useUser();
  const confirm = useConfirm();

  const [state, formAction] = useFormState(purchaseIPO, null);
  const [amount, setAmount] = useState(BigInt(1));

  const wrappedFormAction = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !(await confirm("Are you sure?", {
        description: (
          <>
            This will deduct{" "}
            <strong>
              {currencyFormat.format(
                Big(ipo.unitPrice).mul(Big(amount.toString())).toNumber()
              )}{" "}
              USDT
            </strong>{" "}
            immediately from your credit balance.
          </>
        ),
      }))
    ) {
      return state;
    }

    startTransition(() => {
      return formAction(new FormData(e.target as HTMLFormElement));
    });
  };

  const max = BigInt(
    Big(user!.creditBalance).div(Big(ipo.unitPrice)).toFixed(0)
  );

  return (
    <div>
      <h3 className="h3 ml-4 mb-2">Initial Baller Offering</h3>
      <form className="card flex flex-col gap-4" onSubmit={wrappedFormAction}>
        <input type="hidden" name="ipoId" value={ipo!.id} />

        <div className="flex items-center gap-2 justify-center">
          <WalletIcon className="size-4" />{" "}
          <span className="font-medium">Balance: </span>{" "}
          <span>
            {currencyFormat.format(Big(user!.creditBalance).toNumber())} USDT
          </span>
        </div>

        <div className="flex items-center">
          <span className="input font-medium text-sm py-2 rounded-r-none bg-gray-200 flex items-center text-gray-500 w-32 shrink-0 justify-center">
            Shares
          </span>
          <input
            type="text"
            name="amount"
            className="input rounded-l-none -ml-[1px]"
            defaultValue={amount.toString()}
            onChange={(x) => {
              if (/^\d+$/.test(x.target.value)) {
                setAmount(BigInt(x.target.value));
              } else {
                setAmount(BigInt(0));
              }
            }}
          />
        </div>

        <span className="-mt-3 font-medium text-xs text-gray-500 text-right mr-3">
          Max: {max.toString()}
        </span>

        <div className="flex items-center">
          <span className="input font-medium text-sm py-2 rounded-r-none bg-gray-200 flex items-center text-gray-500 w-32 shrink-0 justify-center">
            Total Price
          </span>

          <span className="input rounded-l-none -ml-[1px]">
            {currencyFormat.format(
              Big(ipo.unitPrice).mul(Big(amount.toString())).toNumber()
            )}{" "}
            USDT
          </span>
        </div>

        <button
          disabled={!(amount > 0) || amount > max}
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

        {amount > max ? (
          <p className="font-light text-sm text-red-700 text-center">
            You currently do not have the necessary funds for this purchase. You
            need to credit{" "}
            <strong>
              {Big(ipo.unitPrice)
                .mul(Big(amount.toString()))
                .sub(Big(user!.creditBalance))
                .toFixed(2)}{" "}
              USDT
            </strong>{" "}
            into your account.
          </p>
        ) : null}

        {amount > 0 ? (
          <p className="font-light text-sm text-gray-500 text-center">
            You will need to pay{" "}
            <strong>
              {currencyFormat.format(
                Big(ipo.unitPrice).mul(Big(amount.toString())).toNumber()
              )}
            </strong>{" "}
            USDT from your balance in order to purchase{" "}
            <strong>{amount.toString()}</strong> piece{amount > 1 ? "s" : ""} of
            this NFT.
          </p>
        ) : (
          <p className="font-light text-sm text-gray-500 text-center">
            Please enter a valid amount to purchase this NFT
          </p>
        )}
      </form>
    </div>
  );
}
