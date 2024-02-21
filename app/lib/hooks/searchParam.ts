import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function usePushSearchParam() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  return useCallback(
    (name: string, value?: string | null, replace: boolean = false) => {
      const newSp = new URLSearchParams(searchParams.toString());

      if (value == null) newSp.delete(name);
      else newSp.set(name, value);

      const newSpString = newSp.toString();

      let newpath = `${pathname}${newSpString.length ? "?" : ""}${newSpString}`;

      if (replace) router.replace(newpath);
      else router.push(newpath);
    },
    [router, pathname, searchParams],
  );
}
