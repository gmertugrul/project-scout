"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { ReactNode, useEffect, useState } from "react";

export function Modal({
  title,
  description,
  children,
  onOpenChange,
}: {
  title?: string;
  description?: ReactNode;
  children: ReactNode;
  onOpenChange?: (open: boolean) => void;
}) {
  const [isOpen, setOpen] = useState(false);

  useEffect(() => setOpen(true), []);

  if (!isOpen) {
    return null;
  }

  return (
    <Dialog.Root open modal onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black overflow-auto bg-opacity-30 grid fixed inset-0 place-items-center p-16">
          <Dialog.Content className="data-[state=open]:animate-contentShow rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
            {title ? <Dialog.Title className="h1">{title}</Dialog.Title> : null}
            {description ? (
              <Dialog.Description className="text-muted mt-6 leading-normal">
                {description}
              </Dialog.Description>
            ) : null}
            <div className="mt-6">{children}</div>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
