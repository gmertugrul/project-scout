"use client";

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

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
    ? href.toString().startsWith(pathname)
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
