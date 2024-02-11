"use client";

import { useFormState } from "react-dom";
import { mintNft } from "@/app/admin/players/[id]/nft/actions";
import { SubmitButton } from "@/app/components/forms.client";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";

export function NftsMint({ contractId }: { contractId: number }) {
  const [state, formAction] = useFormState(mintNft, null);

  return (
    <form action={formAction}>
      {state?.error ? (
        <div className="rounded-md bg-red-100 p-4 flex gap-2 items-center mb-4">
          <ExclamationTriangleIcon
            className="h-5 w-5 text-red-400"
            aria-hidden="true"
          />
          {state.error}
        </div>
      ) : null}

      <input type="hidden" name="id" value={contractId} />
      <SubmitButton className="btn-primary w-full">Mint Next</SubmitButton>
    </form>
  );
}
