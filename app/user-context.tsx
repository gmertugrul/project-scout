"use client";

import { createContext, ReactNode, useContext } from "react";
import { User } from "@/app/db/schema";

const UserContext = createContext<User | null>(null);

export function UserProvider({
  user,
  children,
}: {
  user: User | null;
  children: ReactNode;
}) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function useUser() {
  return useContext(UserContext);
}
