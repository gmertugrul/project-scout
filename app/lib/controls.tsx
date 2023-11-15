"use client";

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export type NavLinkProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof LinkProps
> &
  LinkProps & {
    children: ReactNode;
    activeClassName?: string;
    passiveClassName?: string;
    exact?: boolean;
  };

export function NavLink({
  activeClassName = "active",
  passiveClassName = "",
  className,
  href,
  exact = false,
  children,
  ...props
}: NavLinkProps) {
  const pathname = usePathname();

  const isActive = !exact
    ? pathname.startsWith(href.toString())
    : href.toString() == pathname;

  return (
    <Link
      href={href}
      className={`${className ?? ""} ${
        isActive ? activeClassName : passiveClassName
      }`}
      aria-selected={isActive}
      {...props}
    >
      {children}
    </Link>
  );
}

export function DateTime({
  date,
  dateStyle = "medium",
  timeStyle,
}: {
  date: string | Date;
  dateStyle?: "full" | "long" | "medium" | "short" | undefined;
  timeStyle?: "full" | "long" | "medium" | "short" | undefined;
}) {
  const [formatted, setFormatted] = useState<string>("Loading...");

  useEffect(() => {
    if (typeof date == "string") {
      date = new Date(date);
    }

    setFormatted(
      Intl.DateTimeFormat("en", { dateStyle, timeStyle }).format(date)
    );
  }, [date]);

  return <>{formatted}</>;
}
