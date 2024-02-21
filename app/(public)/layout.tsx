import type { Metadata } from "next";
import { NavBar, NavBarLink } from "../components/navbar";
import React from "react";
import Image from "next/image";
import { ToastProvider } from "@/app/components/toast";

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
    <div className="min-h-[100vh] flex flex-col w-full justify-stretch items-stretch">
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

        <footer className="bg-brand-900 p-4 text-white text-sm font-medium grid grid-cols-2 gap-4 mt-auto">
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Contact Us</a>
          <a href="#">Help</a>

          <div className="col-span-2 flex items-center gap-2 mt-auto">
            <Image
              alt="Project Scout"
              src="/logo-white.svg"
              className="h-4 w-auto"
              width={100}
              height={100}
            />
            The Project Scout, {new Date().getFullYear()} &copy;
          </div>
        </footer>
      </ToastProvider>
    </div>
  );
}
