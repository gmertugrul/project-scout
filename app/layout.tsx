import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { getSessionUser } from "@/app/lib/auth";
import { cookies } from "next/headers";
import { ReactNode } from "react";
import { UserProvider } from "@/app/user-context";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Project Scout",
  description: "",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getSessionUser(cookies());

  return (
    <html lang="en">
      <body className={montserrat.className}>
        <UserProvider user={user ?? null}>{children}</UserProvider>
      </body>
    </html>
  );
}
