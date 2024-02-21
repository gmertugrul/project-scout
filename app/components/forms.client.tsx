"use client";

import { ComponentProps, ReactNode } from "react";
import { useFormStatus } from "react-dom";

type Props = ComponentProps<"button">;

export function SubmitButton(props: Props) {
  const { pending } = useFormStatus();

  return <button {...props} type="submit" disabled={pending} />;
}
