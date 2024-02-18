"use client";

import { Team } from "@/app/db/schema";
import { useEffect, useState } from "react";

export function useTeams() {
  const [data, setData] = useState<{ loading: boolean; teams?: Team[] }>({
    loading: true,
  });

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    let load = async () => {
      try {
        let res = await fetch("/admin/api/teams", { signal });
        setData({ loading: false, teams: await res.json() });
      } catch {}
    };

    load();

    return () => controller.abort();
  }, []);

  return data;
}
