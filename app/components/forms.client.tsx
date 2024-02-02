"use client";

import { ReactNode } from "react";
import { useFormStatus } from "react-dom";

export function SubmitButton({ children }: { children: ReactNode }) {
  const { pending } = useFormStatus();

  return (
    <button className="btn-primary" type="submit" disabled={pending}>
      Save
    </button>
  );
}
