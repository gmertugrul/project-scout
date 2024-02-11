"use client";

import { Modal } from "@/app/components/modal";
import { useRouter } from "next/navigation";
import { FormGroup } from "@/app/components/forms";
import { useFormState } from "react-dom";
import { SubmitButton } from "@/app/components/forms.client";
import Link from "next/link";
import { Team } from "@/app/db/schema";
import { updateTeam } from "./actions";
import { countries } from "@/app/lib/countries";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

function TeamEditor({ team }: { team: Team }) {
  const [state, formAction] = useFormState(updateTeam, null);

  return (
    <div className="space-y-4 w-[500px]">
      <div className="card relative">
        <form action={formAction}>
          <input type="hidden" name="id" value={team.id} />

          <div className="space-y-4">
            <FormGroup
              label="Team Name"
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
                placeholder="Kayserispor"
                defaultValue={team.name}
              />
            </FormGroup>

            <FormGroup
              label="Abbreviation"
              description={
                state?.errors?.abbreviation ? (
                  <span className="text-red-700">
                    {state.errors.abbreviation.join(", ")}
                  </span>
                ) : null
              }
            >
              <input
                name="abbreviation"
                className="input"
                type="text"
                placeholder="KYS"
                defaultValue={team.abbreviation ?? ""}
              />
            </FormGroup>

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
                defaultValue={team.countryCode ?? ""}
              >
                <option disabled value="">
                  None
                </option>
                {countries.map((c) => (
                  <option value={c.code} key={c.code}>
                    {c.name}
                  </option>
                ))}
              </select>
            </FormGroup>

            <hr />

            {state?.team ? (
              <div className="rounded-md bg-green-100 p-4 flex gap-2 items-center">
                <CheckCircleIcon
                  className="h-5 w-5 text-green-400"
                  aria-hidden="true"
                />
                Changes saved
              </div>
            ) : null}

            <div className="flex gap-x-6 items-center justify-end">
              <Link className="btn-text" href="/admin/teams">
                {state?.team ? "Close" : "Cancel"}
              </Link>

              <SubmitButton className="btn-primary">Save</SubmitButton>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export function EditTeam({ team }: { team: Team }) {
  var router = useRouter();

  return (
    <Modal
      title="Edit Team"
      onOpenChange={(closed) => {
        if (!closed) {
          router.push("/admin/teams");
        }
      }}
    >
      <TeamEditor team={team} />
    </Modal>
  );
}
