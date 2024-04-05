"use client";

import { Modal } from "@/app/components/modal";
import { useRouter } from "next/navigation";
import { FormGroup } from "@/app/components/forms";
import { useFormState } from "react-dom";
import { redirect } from "next/navigation";
import { SubmitButton } from "@/app/components/forms.client";
import Link from "next/link";
import { createTeam } from "./actions";

function NewTeam() {
  const [state, formAction] = useFormState(createTeam, null);

  if (state?.team) {
    return redirect(`/admin/teams/${state.team.id}`);
  }

  return (
    <div className="space-y-4 w-[500px]">
      <div className="card relative">
        <form action={formAction}>
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
              />
            </FormGroup>

            <hr />

            <div className="flex gap-x-6 items-center justify-end">
              <Link className="btn-text" href="/admin/teams">
                Cancel
              </Link>

              <SubmitButton className="btn-primary">Save</SubmitButton>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export function CreateTeam({ open }: { open: boolean }) {
  var router = useRouter();

  return (
    <Modal
      title="Create New Team"
      open={open}
      onOpenChange={(closed) => {
        if (!closed) {
          router.push("/admin/teams");
        }
      }}
    >
      <NewTeam />
    </Modal>
  );
}
