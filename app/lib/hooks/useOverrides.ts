import { Dispatch, useState } from "react";

export type SetStateFunction<T> = Dispatch<T>;
export type UpdateStateFunction<T> = Dispatch<Partial<T>>;

export function useUpdateState<T>(
  initial: T,
): [T, SetStateFunction<T>, UpdateStateFunction<T>] {
  const [state, setState] = useState<T>(initial);
  return [
    state,
    setState,
    (data: Partial<T>) => setState({ ...state, ...data }),
  ];
}

export function useOverrides<T>(
  baseData: T,
): [T, Partial<T>, SetStateFunction<T>, UpdateStateFunction<T>] {
  const [overrides, setOverrides, updateOverrides] = useUpdateState<Partial<T>>(
    {},
  );
  return [
    { ...baseData, ...overrides },
    overrides,
    setOverrides,
    updateOverrides,
  ];
}
