import { ReactNode } from "react";
import { NavBar, NavBarLink } from "../components/navbar";
import "./admin.css";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-slate-100 min-h-[100vh]">
      <NavBar>
        <NavBarLink href="/admin/players">Players</NavBarLink>
        <NavBarLink href="/admin/teams">Teams</NavBarLink>
        <NavBarLink href="/admin/users">Users</NavBarLink>
        <NavBarLink href="/admin/settings">Settings</NavBarLink>
      </NavBar>

      <div className="mx-auto max-w-7xl pt-12 pb-8 px-2 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
}
