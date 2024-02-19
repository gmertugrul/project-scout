"use client";

import { Ipo, ipoStatus, NftContract, Player } from "@/app/db/schema";
import { FormGroup, FormLayoutTwoColumn } from "@/app/components/forms";
import React from "react";
import { useFormState } from "react-dom";
import { updateIpo } from "./actions";
import { SubmitButton } from "@/app/components/forms.client";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import Big from "big.js";

export function IpoEditor({
  contract,
  ipo,
}: {
  player: Player;
  contract: NftContract;
  ipo: Ipo | null;
}) {
  const [state, formAction] = useFormState(updateIpo, null);

  return (
    <div className="card relative">
      <form action={formAction}>
        <input type="hidden" name="nftContractId" value={contract.id} />

        <div className="space-y-10">
          <FormLayoutTwoColumn title="IPO Information">
            <FormGroup
              label="Total Supply"
              description={
                state?.errors?.totalSupply ? (
                  <span className="text-red-700">
                    {state.errors.totalSupply.join(", ")}
                  </span>
                ) : (
                  "Number of NFTs to be issued"
                )
              }
            >
              <input
                name="totalSupply"
                className="input"
                type="number"
                min={1}
                step={1}
                placeholder="100000"
                defaultValue={state?.ipo?.totalSupply ?? ipo?.totalSupply}
              />
            </FormGroup>

            <FormGroup
              label="Unit Price (USD)"
              description={
                state?.errors?.unitPrice ? (
                  <span className="text-red-700">
                    {state.errors.unitPrice.join(", ")}
                  </span>
                ) : null
              }
            >
              <input
                name="unitPrice"
                className="input"
                type="number"
                step={0.01}
                min={0.01}
                placeholder="1000.00"
                defaultValue={Big(ipo?.unitPrice ?? 0).toFixed(2) ?? ""}
              />
            </FormGroup>

            <FormGroup
              label="Status"
              description={
                state?.errors?.status ? (
                  <span className="text-red-700">
                    {state.errors.status.join(", ")}
                  </span>
                ) : null
              }
            >
              <select
                className="select"
                name="status"
                defaultValue={ipo?.status}
              >
                {ipoStatus.enumValues.map((value) => (
                  <option value={value} key={value}>
                    {value}
                  </option>
                ))}
              </select>
            </FormGroup>
          </FormLayoutTwoColumn>

          <hr />

          <FormLayoutTwoColumn>
            {state?.ipo ? (
              <div className="rounded-md bg-green-100 p-4 flex gap-2 items-center">
                <CheckCircleIcon
                  className="h-5 w-5 text-green-400"
                  aria-hidden="true"
                />
                Changes saved
              </div>
            ) : null}

            <div className="flex gap-x-6 items-center justify-end">
              <a className="btn-text" href="/admin/players">
                Cancel
              </a>

              <SubmitButton className="btn-primary">Save</SubmitButton>
            </div>
          </FormLayoutTwoColumn>
        </div>
      </form>
    </div>
  );
}
