import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { Fragment } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import state from "../utils/state";
import CategoreyBar from "../pages/categoreyBar";

import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function Layout({ title, children }) {
  const [openNav, setOpenNav] = useState(false);
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const { status, data: session } = useSession();

  const { useStoreState } = state;

  const logoutClickHandler = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <div className="">
      <Head>
        <title>{title ? title + " - GreenMart" : "GreenMart"}</title>
        <meta name="description" content="Biodegradable Marcketplace" />
        <link rel="icon" href="/undraw_environment_iaus.svg" />
      </Head>

      <Navbar className="m-1 mx-auto  py-0 px-4  lg:px-8 lg:py-2 sticky  ">
        <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
          <div>
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
          </div>
          {/* <div>
         
            <CategoreyBar></CategoreyBar>
          </div> */}
          <div className="flex flex-row">
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

            {status === "loading" ? (
              "Loading"
            ) : session?.user ? (
              <Menu>
                <MenuHandler>
                  <button className="flex flex-row items-center  border-2 border-green-300 rounded-md">
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
                  </button>
                </MenuHandler>
                <MenuList>
                  <MenuItem>
                    <Link href="#">Edit Profile</Link>
                  </MenuItem>
                  <MenuItem>
                    {" "}
                    <Link href={`/order/` + session.user.id}>Order Status</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link href="#">Previous Order</Link>
                  </MenuItem>
                  <MenuItem>
                    {session.user.isAdmin && (
                      <Link href="/admin">Admin Dashbord</Link>
                    )}
                  </MenuItem>
                  <MenuItem>
                    <Link href="#" onClick={logoutClickHandler}>
                      Logout
                    </Link>
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <button className="hover:bg-green-100  p-1 px-2 rounded-md">
                <Link href={"/login"}>Login</Link>
              </button>
            )}
          </div>
        </div>
      </Navbar>

        <div className="m-8 place-items-center">{children}</div>
   
      <footer className="flex h-10 justify-center items-center shadow-inner">
        <p>Copyright © 2022 Amazona</p>
      </footer>
    </div>
  );
}

export async function getServerSideProps(context) {
  var existingCategory = await fetch(
    `https://techshopapi.imnayan.xyz/api/admin/category`
  );
  const categoryes = await existingCategory.json();

  return {
    props: {
      categoryes,
    },
  };
}
export default Layout;
