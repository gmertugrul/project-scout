"use client";

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Dialog } from "@headlessui/react";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";
import { useSearchParams } from "next/navigation";
import { usePushSearchParam } from "@/app/lib/hooks/searchParam";

type Toast = {
  key: number;
  icon?: ReactNode;
  variant?: "success" | "error" | "info";
  content: ReactNode;
};

type Confirm = {
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  resolver: (val: boolean) => void;
};

type State = {
  toasts: Toast[];
  confirm?: Confirm;
};

type ToastAction = { type: "add" | "remove"; toast: Toast };
type ConfirmAction = { type: "confirm"; confirm?: Confirm };

type ToastContext = {
  showToast: (
    content: ReactNode,
    options?: { icon?: ReactNode; variant?: Toast["variant"] },
  ) => void;
  confirm: (
    title?: ReactNode,
    options?: { description?: ReactNode; icon?: ReactNode },
  ) => Promise<boolean>;
};

let Ctx = createContext<ToastContext>(null!);

const reducer = (s: State, action: ToastAction | ConfirmAction): State => {
  switch (action.type) {
    case "add":
      return { ...s, toasts: [...s.toasts, action.toast!] };
    case "remove":
      return { ...s, toasts: s.toasts.filter((x) => x != action.toast) };
    case "confirm":
      return { ...s, confirm: action.confirm };
  }

  return s;
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams();
  const pushSearchParams = usePushSearchParam();

  const [state, dispatch] = useReducer(reducer, { toasts: [] });

  const ctx = useMemo<ToastContext>(() => {
    return {
      showToast: (content, options = {}) => {
        const toast = { ...options, content, key: Date.now() };

        dispatch({ type: "add", toast });

        setTimeout(() => {
          dispatch({ type: "remove", toast });
        }, 2500);
      },
      confirm: (title = "Are you sure?", options = {}): Promise<boolean> => {
        let _res: Confirm["resolver"] = null!;
        const promise = new Promise<boolean>((res, _) => (_res = res));
        const confirm = {
          ...options,
          title,
          resolver: (result: boolean) => {
            _res(result);
            dispatch({ type: "confirm", confirm: undefined });
          },
        };
        dispatch({ type: "confirm", confirm });
        return promise;
      },
    };
  }, [dispatch]);

  const message = searchParams.get("message");
  const error = searchParams.get("error");

  useEffect(() => {
    if (message) {
      ctx.showToast(message);
      pushSearchParams("message", null, true);
    } else if (error) {
      ctx.showToast(error, { variant: "error" });
      pushSearchParams("error", null, true);
    }
  }, [message, error, ctx, pushSearchParams]);

  const confirm = state.confirm;

  return (
    <Ctx.Provider value={ctx}>
      {children}

      <div
        id="toasts"
        className="fixed top-7 right-10 flex flex-col gap-y-2 z-50"
      >
        <AnimatePresence>
          {state.toasts.map((t) => (
            <ToastItem toast={t} key={t.key} />
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {confirm != null ? (
          <Dialog
            onClose={() => confirm.resolver(false)}
            onMouseDown={(e) => e.preventDefault()}
            onClick={(e) => e.preventDefault()}
            open
            static
          >
            <motion.div
              className="fixed z-50 inset-4 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

              <Dialog.Panel className="relative overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <div className="h-6 w-6 text-red-600">
                      {confirm.icon ?? (
                        <ExclamationTriangleIcon aria-hidden="true" />
                      )}
                    </div>
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-10 text-gray-900"
                    >
                      {confirm.title}
                    </Dialog.Title>
                    {confirm.description != null ? (
                      <p className="text-sm text-gray-500">
                        {confirm.description}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="btn-primary inline-flex w-full justify-center sm:ml-3 sm:w-auto"
                    onClick={() => confirm.resolver(true)}
                  >
                    Confirm
                  </button>
                  <button
                    type="button"
                    className="btn-white mt-3 inline-flex w-full justify-center sm:mt-0 sm:w-auto"
                    onClick={() => confirm.resolver(false)}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </motion.div>
          </Dialog>
        ) : null}
      </AnimatePresence>
    </Ctx.Provider>
  );
}

function ToastItem({ toast }: { toast: Toast }) {
  const iconClass = {
    success: "text-green-500 bg-green-100",
    error: "text-red-500 bg-red-100",
    info: "text-blue-500 bg-blue-100",
  }[toast.variant ?? "success"];

  const icon =
    toast.icon ??
    {
      success: <CheckCircleIcon aria-hidden="true" />,
      error: <ExclamationTriangleIcon aria-hidden="true" />,
      info: <InformationCircleIcon aria-hidden="true" />,
    }[toast.variant ?? "success"];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      <div className="flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow">
        <div
          className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 p-1 rounded-lg ${iconClass}`}
        >
          {icon}
        </div>
        <div className="ml-3 text-sm font-normal">{toast.content}</div>
      </div>
    </motion.div>
  );
}

export function useToast() {
  return useContext(Ctx).showToast;
}

export function useConfirm() {
  return useContext(Ctx).confirm;
}
