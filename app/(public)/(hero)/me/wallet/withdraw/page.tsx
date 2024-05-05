"use client";

import { useState } from "react";

export default function WithdrawPage() {
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");

  return (
    <div>
      <h3 className="h3 mb-6">Withdraw USDT</h3>

      <div className="flex flex-col gap-2 items-center">
        <span className="text-sm my-2 border border-gray-500 rounded px-4 py-2 w-full flex flex-col focus-within:border-brand-700">
          <label className="text-sm text-black">Network</label>
          <select className="border-0 focus:ring-0 p-0 text-sm font-bold">
            <option>Ethereum</option>
            <option>Polygon</option>
          </select>
        </span>

        <span className="text-sm my-2 border border-gray-500 rounded px-4 py-2 w-full flex flex-col focus-within:border-brand-700">
          <label className="text-sm text-black">Address</label>
          <input
            className="border-0 focus:ring-0 p-0 text-sm font-bold"
            placeholder="0x0000000000000000000000000"
            value={address}
            onChange={(x) => setAddress(x.target.value)}
          ></input>
        </span>

        <span className="text-sm my-2 border border-gray-500 rounded px-4 py-2 w-full flex flex-col gap-2 focus-within:border-brand-700">
          <div className="flex">
            <label
              htmlFor="withdraw-amount"
              className="text-sm text-black whitespace-nowrap"
            >
              Withdrawal Amount
            </label>
            <input
              id="withdraw-amount"
              className="border-0 focus:ring-0 p-0 text-sm font-bold w-full text-right"
              placeholder="0.00"
              value={amount}
              onChange={(x) => setAmount(x.target.value)}
            ></input>
            <span className="ml-1">USDT</span>
          </div>
          <hr />
          <div className="flex">
            <span className="text-sm text-black whitespace-nowrap flex gap-1">
              <span className="pr-4">Available:</span>
              <strong>133.70</strong>
              <span>USDT</span>
            </span>
            <button
              className="text-sm font-bold ml-auto"
              onClick={() => setAmount("133.70")}
            >
              Use All
            </button>
          </div>
        </span>

        <span className="text-sm my-2 border border-gray-500 rounded px-4 py-2 w-full flex focus-within:border-brand-700">
          <label className="text-sm text-black whitespace-nowrap">
            Minimum Withdrawal Amount
          </label>
          <span className="ml-auto mr-1">0.05</span>
          <span>USDT</span>
        </span>

        <button className="btn-primary w-full py-3" disabled={!amount}>
          Initiate Withdrawal
        </button>
      </div>
    </div>
  );
}
