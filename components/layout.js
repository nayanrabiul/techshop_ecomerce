import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import state from "../utils/state";
import CategoreyBar from "../pages/categoreyBar";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function Layout({ title, children }) {
  const { status, data: session } = useSession();

  const { useStoreState } = state;

  const logoutClickHandler = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <div className="mx-16">
      <Head>
        <title>{title ? title + " - GreenMart" : "GreenMart"}</title>
        <meta name="description" content="Biodegradable Marcketplace" />
        <link rel="icon" href="/undraw_environment_iaus.svg" />
      </Head>

      <div className="flex min-h-screen flex-col justify-between mx-9">
      <div className="sticky top-0 z-50 bg-white    ">
          <CategoreyBar></CategoreyBar>
        </div>
        <header className="  bg-white ">
          <nav className=" flex flex-row flex-wrap justify-center	 items-center px-4 md:px-8 shadow-md  bg-transparent ">
            <Link href={"/"}>
              <div className="p-2 m-1 bg-green-300 rounded-md hover:cursor-pointer flex justify-center items-center">
                <Image
                  src={"/undraw_environment_iaus.svg"}
                  alt={"this a logo image"}
                  width={50}
                  height={50}
                ></Image>
              </div>
            </Link>

            {/* drop down */}
            <div>
              {status === "loading" ? (
                "Loading"
              ) : session?.user ? (
                <Menu
                  as="div"
                  className="relative inline-block text-left px-2 "
                >
                  <div>
                    <Menu.Button className="inline-flex w-full justify-center items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                      <Image
                        src="/profile.svg"
                        alt="alt value"
                        width={20}
                        height={20}
                        className=""
                      ></Image>
                      {session.user.name}
                      <ChevronDownIcon
                        className="-mr-1 ml-2 h-5 w-5"
                        aria-hidden="true"
                      />
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
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="#"
                              className={classNames(
                                active
                                  ? "bg-green-100 text-gray-900"
                                  : "text-gray-700",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              Edit Profile
                            </Link>
                          )}
                        </Menu.Item>
                        {/* <Menu.Item>
                          {({ active }) => (
                            link
                              href="#"
                              className={classNames(
                                active
                                  ? "bg-green-100 text-gray-900"
                                  : "text-gray-700",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              Change Password
                            </link>
                          )}
                        </Menu.Item> */}
                      </div>

                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href={`/order/` + session.user.id}
                              className={classNames(
                                active
                                  ? "bg-green-100 text-gray-900"
                                  : "text-gray-700",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              Order Status
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="#"
                              className={classNames(
                                active
                                  ? "bg-green-100 text-gray-900"
                                  : "text-gray-700",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              Previous Order
                            </Link>
                          )}
                        </Menu.Item>
                      </div>
                      {session.user.isAdmin && (
                        <div className="py-1">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="/admin"
                                className={classNames(
                                  active
                                    ? "bg-green-100 text-gray-900"
                                    : "text-gray-700",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                Admin Dashbord
                              </Link>
                            )}
                          </Menu.Item>
                        </div>
                      )}
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="#"
                              onClick={logoutClickHandler}
                              className={classNames(
                                active
                                  ? "bg-green-100 text-gray-900"
                                  : "text-gray-700",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              Logout
                            </Link>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              ) : (
                <button className="hover:bg-green-100  p-1 px-2 rounded-md">
                  <Link href={"/login"}>Login</Link>
                </button>
              )}
            </div>

            <Link href={"/order"}>
              <button className="p-2 m-1 bg-green-100 rounded-md  flex flex-row">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>

                <span className="text-xl">
                  {useStoreState("cartItems").length}
                </span>
              </button>
            </Link>
          </nav>
        
        </header>

        <main className="container m-auto mt-0 mx-8 self-center">
          {children}
        </main>
        <footer className="flex h-10 justify-center items-center shadow-inner">
          <p>Copyright © 2022 Amazona</p>
        </footer>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  var existingCategory = await fetch(
    `http://localhost:3000/api/admin/category`
  );
  const categoryes = await existingCategory.json();
  console.log(categoryes);
  return {
    props: {
      categoryes,
    },
  };
}
export default Layout;
