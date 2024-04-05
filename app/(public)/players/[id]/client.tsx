"use client";

import { ReactNode, useEffect, useState } from "react";
import { Chart, ArcElement } from "chart.js";
Chart.register(ArcElement);
import { Pie } from "react-chartjs-2";
import { ActionSheet, Modal } from "@/app/components/modal";
import Link from "next/link";
import { Player } from "@/app/db/schema";
import { Dialog } from "@headlessui/react";
import { DialogClose } from "@radix-ui/react-dialog";
import { ArrowsUpDownIcon, WalletIcon } from "@heroicons/react/24/outline";
import { CheckIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

export function IBOActiveChart() {
  return (
    <Pie
      data={{
        labels: ["Total", "Sold"],
        datasets: [
          {
            data: [1000, 250],
            backgroundColor: ["#eeeeee", "#0046b3"],
            hoverBackgroundColor: ["#eeeeee", "#004ce6"],
          },
        ],
      }}
    />
  );
}

export function IBOCounter({ target }: { target: Date }) {
  const [remaining, setRemaining] = useState(target.getTime() - Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(target.getTime() - Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, [target]);

  const days = Math.floor(remaining / 1000 / 60 / 60 / 24);
  const hours = Math.floor((remaining / 1000 / 60 / 60) % 24);
  const minutes = Math.floor((remaining / 1000 / 60) % 60);
  const seconds = Math.floor((remaining / 1000) % 60);

  function Segment({ value, label }: { value: number; label: string }) {
    return (
      <span className="tabular-nums relative rounded shadow-lg px-3 py-4 bg-brand-900 text-white font-medium text-3xl grow text-center">
        {value.toFixed(0).padStart(2, "0")}
        <span className="text-sm text-gray-500 absolute text-center inset-x-0 -bottom-6">
          {label}
        </span>
      </span>
    );
  }

  return (
    <div className="flex items-center pb-6">
      <Segment value={days} label="Days" />
      <span className="text-brand-900 px-1 font-medium text-3xl">:</span>
      <Segment value={hours} label="Hours" />
      <span className="text-brand-900 px-1 font-medium text-3xl">:</span>
      <Segment value={minutes} label="Minutes" />
      <span className="text-brand-900 px-1 font-medium text-3xl">:</span>
      <Segment value={seconds} label="Seconds" />
    </div>
  );
}

export function BuyModal({
  player,
  trigger = (
    <fieldset>
      <span className="btn-primary block text-center w-full cursor-pointer">
        Buy Now
      </span>
    </fieldset>
  ),
}: {
  player: Player;
  trigger?: ReactNode;
}) {
  const [state, setState] = useState<"idle" | "sheet" | "confirm" | "success">(
    "idle"
  );

  return (
    <>
      <BuySheet
        trigger={trigger}
        open={state == "sheet"}
        onOpenChange={(open) =>
          setState((s) => (open ? "sheet" : s == "sheet" ? "idle" : s))
        }
        player={player}
        onBuy={() => setState("confirm")}
      />

      <BuyConfirm
        open={state == "confirm"}
        onOpenChange={(open) =>
          setState((s) => (open ? "confirm" : s == "confirm" ? "sheet" : s))
        }
        onConfirm={() => setState("success")}
      />

      <BuySuccess
        open={state == "success"}
        onOpenChange={(open) =>
          setState((s) => (open ? "success" : s == "success" ? "idle" : s))
        }
      />
    </>
  );
}

function BuySuccess({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={<span className="block text-center">Success</span>}
    >
      <div className="flex flex-col items-center gap-4 text-gray-500">
        <DialogClose>
          <span className="bg-green-700 inline-block rounded-full p-4">
            <CheckIcon className="size-12 text-white" />
          </span>
        </DialogClose>

        <p className="text-center">Purchase successful. Thank you!</p>
      </div>
    </Modal>
  );
}

function BuyConfirm({
  open,
  onOpenChange,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}) {
  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={<span className="block text-center">Confirm Purchase</span>}
    >
      <div className="flex flex-col items-center gap-4 text-gray-500">
        <p className="text-center">Are you sure?</p>
        <span className="text-brand-900 text-2xl font-bold">100 USDT</span>
        <p className="text-center">
          will be deducted from your balance immediately
        </p>
        <button className="btn-primary px-16 py-4 text-lg" onClick={onConfirm}>
          Confirm
        </button>
        <DialogClose asChild>
          <button className="btn-text">Cancel</button>
        </DialogClose>
      </div>
    </Modal>
  );
}

function BuySheet({
  player,
  onBuy,
  open,
  onOpenChange,
  trigger,
}: {
  player: Player;
  onBuy?: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger: ReactNode;
}) {
  const [count, setCount] = useState(0);

  return (
    <ActionSheet open={open} onOpenChange={onOpenChange} trigger={trigger}>
      <div className="flex flex-col gap-6">
        <DialogClose asChild>
          <span className="close-handle self-center w-16 h-1.5 bg-gray-300 rounded"></span>
        </DialogClose>

        <div className="flex items-center gap-2">
          <WalletIcon className="size-12 text-gray-500" />
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Total Balance</span>
            <strong>2,500.00 USDT</strong>
          </div>
        </div>

        <div className="card p-card-sm flex items-center gap-4">
          <button
            className="bg-brand-900 rounded-full p-2 focus-visible:outline-none"
            onClick={() => setCount(Math.max(0, count - 1))}
          >
            <MinusIcon className="size-6 text-white" />
          </button>

          <div className="grow flex justify-center text-black font-bold text-2xl">
            {count}
          </div>

          <button
            className="bg-brand-900 rounded-full p-2 focus-visible:outline-none"
            onClick={() => setCount(count + 1)}
          >
            <PlusIcon className="size-6 text-white" />
          </button>
        </div>

        <div className="grid grid-cols-4 gap-4 -mt-4">
          <button
            className={clsx("card px-2 py-1 text-center font-bold", {
              "text-white bg-brand-900": count == 25,
            })}
            onClick={() => setCount(25)}
          >
            25%
          </button>
          <button
            className={clsx("card px-2 py-1 text-center font-bold", {
              "text-white bg-brand-900": count == 50,
            })}
            onClick={() => setCount(50)}
          >
            50%
          </button>
          <button
            className={clsx("card px-2 py-1 text-center font-bold", {
              "text-white bg-brand-900": count == 75,
            })}
            onClick={() => setCount(75)}
          >
            75%
          </button>
          <button
            className={clsx("card px-2 py-1 text-center font-bold", {
              "text-white bg-brand-900": count == 100,
            })}
            onClick={() => setCount(100)}
          >
            100%
          </button>
        </div>

        <span className="text-sm text-gray-500 text-center">
          max <strong>100</strong> shares
        </span>

        <span className="text-center">
          <span className="bg-brand-900 p-2 rounded-full inline-block text-white">
            <ArrowsUpDownIcon className="size-12" />
          </span>
        </span>

        <div className="card p-card-sm flex items-center justify-center text-black font-bold text-2xl gap-2">
          {count * 100} <span className="text-gray-500">USDT</span>
        </div>

        <div className="grid grid-cols-4 gap-4 -mt-4">
          <button
            className={clsx("card px-2 py-1 text-center font-bold", {
              "text-white bg-brand-900": count == 15,
            })}
            onClick={() => setCount(15)}
          >
            25%
          </button>
          <button
            className={clsx("card px-2 py-1 text-center font-bold", {
              "text-white bg-brand-900": count == 30,
            })}
            onClick={() => setCount(30)}
          >
            50%
          </button>
          <button
            className={clsx("card px-2 py-1 text-center font-bold", {
              "text-white bg-brand-900": count == 45,
            })}
            onClick={() => setCount(45)}
          >
            75%
          </button>
          <button
            className={clsx("card px-2 py-1 text-center font-bold", {
              "text-white bg-brand-900": count == 60,
            })}
            onClick={() => setCount(60)}
          >
            100%
          </button>
        </div>

        <span className="text-sm text-gray-500 text-center">
          max <strong>6000</strong> USDT
        </span>

        <div className="flex justify-center">
          <button
            className="btn-primary text-2xl font-bold px-20 py-3"
            onClick={onBuy}
          >
            BUY
          </button>
        </div>
      </div>
    </ActionSheet>
  );
}
