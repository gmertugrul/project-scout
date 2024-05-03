import type { Metadata } from "next";
import { NavBar, NavBarLink } from "../components/navbar";
import React from "react";
import { ToastProvider } from "@/app/components/toast";
import { GlobalActionSheet } from "./client";

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
        {children}

        <footer
          id="global-footer"
          style={{ boxShadow: "0px 3px 28px rgba(0, 0, 0, 0.3)" }}
          className="fixed rounded-t-2xl inset-x-0 bottom-0 bg-white flex justify-center px-4 items-center"
        >
          <div className="flex justify-center relative -top-4">
            <GlobalActionSheet />
          </div>
        </footer>
      </ToastProvider>
    </div>
  );
}
