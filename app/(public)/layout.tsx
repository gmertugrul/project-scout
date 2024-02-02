import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "../globals.css";
import { NavBar, NavBarLink } from "../components/navbar";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Project Scout",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar>
        <NavBarLink href="/players">Players</NavBarLink>
        <NavBarLink href="#">Activity</NavBarLink>
        <NavBarLink href="#">Trade</NavBarLink>
      </NavBar>

      <div className="mx-auto max-w-7xl">{children}</div>
    </>
  );
}
