"use client";

import {
  FormGroup,
  FormGroupToggle,
  FormLayoutTwoColumn,
} from "@/app/components/forms";
import { NftContract, Player } from "@/app/db/schema";
import { SubmitButton } from "@/app/components/forms.client";
import { useFormState } from "react-dom";
import { updateNftContract } from "@/app/admin/players/[id]/nft/actions";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useRef } from "react";
import { useOverrides } from "@/app/lib/hooks/useOverrides";

export function NftEditor({
  player,
  contract,
}: {
  player: Player;
  contract: NftContract | null;
}) {
  const form = useRef<HTMLFormElement>(null);

  const [data, , set, update] = useOverrides(contract);

  const updateNftContractWrapped: typeof updateNftContract = async (
    ...args
  ) => {
    let res = await updateNftContract(...args);
    if (res.nftContract) set(res.nftContract);
    return res;
  };

  const [state, formAction] = useFormState(updateNftContractWrapped, null);

  return (
    <div className="card relative">
      <form ref={form} action={formAction}>
        <input type="hidden" name="playerId" value={player.id} />

        <div className="space-y-10">
          <FormLayoutTwoColumn title="NFT Information">
            <FormGroup
              label="Name"
              description={
                state?.errors?.name ? (
                  <span className="text-red-700">
                    {state.errors.name.join(", ")}
                  </span>
                ) : null
              }
            >
              <input
                name="name"
                className="input"
                type="text"
                placeholder="Bored Ape Yacht Club"
                value={data?.name}
                onChange={(x) => update({ name: x.target.value })}
              />
            </FormGroup>

            <FormGroup
              label="Symbol"
              description={
                state?.errors?.symbol ? (
                  <span className="text-red-700">
                    {state.errors.symbol.join(", ")}
                  </span>
                ) : null
              }
            >
              <input
                name="symbol"
                className="input"
                type="text"
                placeholder="BAYC"
                value={data?.symbol ?? ""}
                onChange={(x) => update({ symbol: x.target.value })}
              />
            </FormGroup>

            <FormGroup
              label="Total Supply"
              description={
                state?.errors?.totalSupply ? (
                  <span className="text-red-700">
                    {state.errors.totalSupply.join(", ")}
                  </span>
                ) : null
              }
            >
              <input
                name="totalSupply"
                className="input"
                type="number"
                min={0}
                max={1000000000}
                step={1}
                placeholder="100000"
                value={data?.totalSupply ?? ""}
                onChange={(x) =>
                  update({ totalSupply: x.target.valueAsNumber })
                }
              />
            </FormGroup>

            <FormGroup
              label="Contract Address"
              description={
                state?.errors?.address ? (
                  <span className="text-red-700">
                    {state.errors.address.join(", ")}
                  </span>
                ) : null
              }
            >
              <input
                name="address"
                className="input"
                type="text"
                placeholder="0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d"
                value={data?.address ?? ""}
                onChange={(x) => update({ address: x.target.value })}
              />
            </FormGroup>

            <FormGroupToggle
              label="Is Tradable"
              description={
                state?.errors?.isTradable ? (
                  <span className="text-red-700">
                    {state.errors.isTradable.join(", ")}
                  </span>
                ) : (
                  <span>Allow free trade between users</span>
                )
              }
            >
              <input
                type="checkbox"
                className="input-checkbox"
                name="isTradable"
                checked={data?.isTradable ?? false}
                onChange={(x) => update({ isTradable: x.target.checked })}
              />
            </FormGroupToggle>
          </FormLayoutTwoColumn>

          <hr />

          <FormLayoutTwoColumn>
            {state?.nftContract ? (
              <div className="rounded-md bg-green-100 p-4 flex gap-2 items-center">
                <CheckCircleIcon
                  className="h-5 w-5 text-green-400"
                  aria-hidden="true"
                />
                Changes saved
              </div>
            ) : null}

            <div className="flex gap-x-6 items-center justify-end">
              <button className="btn-text" type="reset">
                Cancel
              </button>

              <SubmitButton className="btn-primary">Save</SubmitButton>
            </div>
          </FormLayoutTwoColumn>
        </div>
      </form>
    </div>
  );
}
