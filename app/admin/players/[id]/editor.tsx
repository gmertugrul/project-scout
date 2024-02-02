"use client";

import { FormGroup, FormLayoutTwoColumn } from "@/app/components/forms";
import { Player } from "@/app/db/schema";
import { useFormState } from "react-dom";
import { SubmitButton } from "@/app/components/forms.client";
import { updatePlayer } from "./actions";
import { countries } from "@/app/lib/countries";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useTeams } from "@/app/lib/hooks/useTeams";
import { positions } from "@/app/lib/positions";

export function PlayerEditor({ player }: { player: Player }) {
  const [state, formAction] = useFormState(updatePlayer, null);
  const teams = useTeams();

  return (
    <div className="card relative">
      <form action={formAction}>
        <input type="hidden" name="id" value={player.id} />

        <div className="space-y-10">
          <FormLayoutTwoColumn title="Basic Info">
            <FormGroup
              label="First Name"
              description={
                state?.errors?.firstName ? (
                  <span className="text-red-700">
                    {state.errors.firstName.join(", ")}
                  </span>
                ) : null
              }
            >
              <input
                name="firstName"
                className="input"
                type="text"
                placeholder="Tim"
                defaultValue={player.firstName}
              />
            </FormGroup>

            <FormGroup
              label="Last Name"
              description={
                state?.errors?.lastName ? (
                  <span className="text-red-700">
                    {state.errors.lastName.join(", ")}
                  </span>
                ) : null
              }
            >
              <input
                name="lastName"
                className="input"
                type="text"
                placeholder="Cook"
                defaultValue={player.lastName}
              />
            </FormGroup>

            <FormGroup
              label="Birthdate"
              description={
                state?.errors?.birthDate ? (
                  <span className="text-red-700">
                    {state.errors.birthDate.join(", ")}
                  </span>
                ) : null
              }
            >
              <input
                name="birthDate"
                className="input"
                type="date"
                defaultValue={
                  new Date(player.birthDate).toISOString().split("T")[0]
                }
              />
            </FormGroup>

            <FormGroup label="Picture">
              <input
                name="picture"
                className="file"
                type="file"
                accept="image/*"
              />
            </FormGroup>
          </FormLayoutTwoColumn>

          <hr />

          <FormLayoutTwoColumn title="Associations">
            <FormGroup
              label="Country"
              description={
                state?.errors?.countryCode ? (
                  <span className="text-red-700">
                    {state.errors.countryCode.join(", ")}
                  </span>
                ) : null
              }
            >
              <select
                name="countryCode"
                className="select"
                defaultValue={player.countryCode ?? ""}
              >
                <option value="">None</option>
                {countries.map((c) => (
                  <option value={c.code} key={c.code}>
                    {c.name}
                  </option>
                ))}
              </select>
            </FormGroup>

            <FormGroup label="Team">
              {teams.teams ? (
                <select
                  name="teamId"
                  className="select"
                  defaultValue={player.teamId ?? ""}
                >
                  <option value="">None</option>

                  {teams.teams.map((c) => (
                    <option value={c.id} key={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              ) : (
                <span className="input text-muted">Loading...</span>
              )}
            </FormGroup>

            <FormGroup
              label="Position"
              description={
                state?.errors?.position ? (
                  <span className="text-red-700">
                    {state.errors.position.join(", ")}
                  </span>
                ) : null
              }
            >
              <select
                name="position"
                className="select"
                defaultValue={player.position ?? ""}
              >
                <option value="">None</option>

                {positions.map((group) => (
                  <optgroup label={group.name} key={group.name}>
                    {group.positions.map((pos) => (
                      <option value={pos.value} key={pos.value}>
                        [{pos.value}] {pos.name}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </FormGroup>
          </FormLayoutTwoColumn>

          <hr />

          {state?.player ? (
            <div className="rounded-md bg-green-100 p-4 flex gap-2 items-center">
              <CheckCircleIcon
                className="h-5 w-5 text-green-400"
                aria-hidden="true"
              />
              Changes saved
            </div>
          ) : null}

          <FormLayoutTwoColumn>
            <div className="flex gap-x-6 items-center justify-end">
              <a className="btn-text" href="/admin/players">
                Cancel
              </a>

              <SubmitButton>Save</SubmitButton>
            </div>
          </FormLayoutTwoColumn>
        </div>
      </form>
    </div>
  );
}
