"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { ReactNode } from "react";

export function Modal({
  title,
  description,
  children,
  open = true,
  onOpenChange,
}: {
  title?: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  return (
    <Dialog.Root open={open} modal onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-overlayShow data-[state=closed]:animate-overlayHide bg-black overflow-auto bg-opacity-30 grid fixed inset-0 place-items-center p-16">
          <Dialog.Content className="data-[state=open]:animate-contentShow data-[state=closed]:animate-contentHide rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
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

export function ActionSheet({
  title,
  description,
  children,
  trigger,
  open,
  onOpenChange,
}: {
  title?: string;
  description?: ReactNode;
  children: ReactNode;
  trigger?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  return (
    <Dialog.Root open={open} modal onOpenChange={onOpenChange}>
      {trigger ? <Dialog.Trigger asChild>{trigger}</Dialog.Trigger> : null}
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-sheetOverlayShow data-[state=closed]:animate-sheetOverlayHide backdrop-blur bg-black overflow-hidden bg-opacity-30 fixed inset-0">
          <Dialog.Content className="data-[state=open]:animate-sheetContentShow data-[state=closed]:animate-sheetContentHide max-w-[550px] fixed inset-x-2 mx-auto bottom-0 rounded-t-[10px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
            {title ? <Dialog.Title className="h1">{title}</Dialog.Title> : null}
            {description ? (
              <Dialog.Description className="text-muted mt-6 leading-normal">
                {description}
              </Dialog.Description>
            ) : null}
            {children}
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
