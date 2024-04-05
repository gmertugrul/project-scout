"use client";

import { Modal } from "@/app/components/modal";
import { useRouter } from "next/navigation";
import { FormGroup, FormLayoutTwoColumn } from "@/app/components/forms";
import { useFormState } from "react-dom";
import { createPlayer } from "./actions";
import { Player } from "@/app/db/schema";
import { redirect } from "next/navigation";
import { SubmitButton } from "@/app/components/forms.client";
import Link from "next/link";

const initialState:
  | {
      errors?: Record<string, string[] | undefined>;
      player?: Player;
    }
  | undefined = {};

function NewPlayer() {
  const [state, formAction] = useFormState(createPlayer, initialState);

  if (state?.player) {
    return redirect(`/admin/players/${state.player.id}`);
  }

  return (
    <div className="space-y-4 w-[500px]">
      <div className="card relative">
        <form action={formAction}>
          <div className="space-y-4">
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
                  new Date("2000-01-01").toISOString().split("T")[0]
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

            <hr />

            <div className="flex gap-x-6 items-center justify-end">
              <Link className="btn-text" href="/admin/players">
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

export function CreatePlayer({ open }: { open: boolean }) {
  var router = useRouter();

  return (
    <Modal
      title="Create New Player"
      open={open}
      onOpenChange={(closed) => {
        if (!closed) {
          router.push("/admin/players");
        }
      }}
    >
      <NewPlayer />
    </Modal>
  );
}
