"use client";

import { Fragment, ReactNode } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { NavLink } from "../lib/controls";
import Link from "next/link";
import { Avatar } from "@/app/components/avatar";
import { User } from "@/app/db/schema";
import { useUser } from "@/app/user-context";
import {
  ArrowLeftStartOnRectangleIcon,
  WalletIcon,
} from "@heroicons/react/24/solid";
import Big from "big.js";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function NavBar({ children }: { children: ReactNode }) {
  const user = useUser();

  return (
    <Disclosure as="nav" className="bg-brand-900">
      {({ open }) => (
        <>
          <div className="px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <Link href="/" className="flex flex-shrink-0 items-center">
                  <Image
                    alt="Project Scout"
                    src="/logo-white.svg"
                    className="h-8 w-auto"
                    width={100}
                    height={100}
                  />
                </Link>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">{children}</div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-300 text-sm focus:outline-none">
                      {user ? (
                        <Avatar
                          className="size-7"
                          name={user.name ?? user.email}
                        />
                      ) : null}
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "flex items-center gap-1 px-4 py-2 text-sm text-gray-700",
                            )}
                          >
                            <WalletIcon className="size-4" />
                            <span>Balance:</span>
                            {Big(user!.creditBalance).toFixed(2)}
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="/auth/logout"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "flex items-center gap-1  px-4 py-2 text-sm text-gray-700",
                            )}
                          >
                            <ArrowLeftStartOnRectangleIcon className="size-4" />
                            Sign out
                          </Link>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-x-1 px-2 pb-6 pt-2 text-center">
              {children}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

export function NavBarLink({
  href,
  children,
  exact,
}: {
  href: string;
  children: ReactNode;
  exact?: boolean;
}) {
  return (
    <NavLink
      href={href}
      className="text-gray-300 hover:bg-brand-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
      activeClassName="bg-brand-800 text-white"
      exact={exact}
    >
      {children}
    </NavLink>
  );
}
