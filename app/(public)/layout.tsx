import type { Metadata } from "next";
import { NavBar, NavBarLink } from "../components/navbar";
import React from "react";

import { ToastProvider } from "@/app/components/toast";

import {
  MagnifyingGlassIcon,
  HomeIcon,
  UserIcon,
  CogIcon,
} from "@heroicons/react/24/outline";
import { ArrowsUpDownIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Project Scout",
  description: "",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[100vh] pb-16 flex flex-col w-full justify-stretch items-stretch">
      <ToastProvider>
        <NavBar>
          <NavBarLink href="/" exact>
            Home
          </NavBarLink>
          <NavBarLink href="/players/ibos">IBOs</NavBarLink>
          <NavBarLink href="/players" exact>
            Market
          </NavBarLink>
          <NavBarLink href="/players/starred">Starred</NavBarLink>
          <NavBarLink href="/players/my">My Ballers</NavBarLink>
        </NavBar>

        <div className="p-4 grow relative">{children}</div>

        <footer
          style={{ boxShadow: "0px 3px 28px rgba(0, 0, 0, 0.3)" }}
          className="fixed rounded-t-2xl inset-x-0 bottom-0 bg-white grid grid-cols-5 px-4 py-2 items-center"
        >
          <div className="flex justify-center">
            <a href="#">
              <HomeIcon className="size-6" />
            </a>
          </div>

          <div className="flex justify-center">
            <a href="#">
              <MagnifyingGlassIcon className="size-6" />
            </a>
          </div>

          <div className="flex justify-center">
            <Link
              href="/players"
              className="p-2 bg-brand-950 rounded-full text-white"
            >
              <ArrowsUpDownIcon className="size-8" />
            </Link>
          </div>

          <div className="flex justify-center">
            <a href="#">
              <UserIcon className="size-6" />
            </a>
          </div>

          <div className="flex justify-center">
            <a href="#">
              <CogIcon className="size-6" />
            </a>
          </div>
        </footer>
      </ToastProvider>
    </div>
  );
}
