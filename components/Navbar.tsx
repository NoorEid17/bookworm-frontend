"use client";
import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, Fragment, useContext } from "react";
import { AuthContext } from "./AuthProvider";
import * as UserAPI from "@/api/user";
import { BiSolidChevronDown } from "react-icons/bi";

const Navbar = () => {
  const { state, dispatch } = useContext(AuthContext);
  return (
    <nav className="min-h-5 grid grid-cols-3 p-2 bg-white shadow-md shadow-emerald-400/10 w-full">
      <div></div>
      <div className="flex justify-center">
        <Link href="/">
          <Image src="/assets/Logo.png" alt="Logo" width={150} height={24} />
        </Link>
      </div>
      <div className="flex justify-end">
        {state.isAuthenticated ? (
          <AuthenticatedView user={state.user} dispatch={dispatch} />
        ) : (
          <UnAuthenticatedView />
        )}
      </div>
    </nav>
  );
};

const UnAuthenticatedView = () => (
  <>
    <Link
      href="/login"
      className="text-white bg-primary rounded-md border-2 border-w border-primary py-1 px-3 mx-3 transition-all hover:contrast-125"
    >
      Login
    </Link>
    <Link
      href="/signup"
      className="text-white bg-primary rounded-md border-2 border-w border-primary py-1 px-3 mx-3 transition-all hover:contrast-125"
    >
      Signup
    </Link>
  </>
);

const AuthenticatedView = ({
  user,
  dispatch,
}: {
  user: any;
  dispatch: Dispatch<any>;
}) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex items-center align-middle justify-center rounded-md transition-colors text-slate-700 px-4 py-1 gap-1 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          <Image
            className="rounded-full"
            src={
              user.avatar
                ? `http://localhost:5000/uploads/${user.avatar}`
                : "/assets/user.png"
            }
            alt="user avatar"
            width="32"
            height="32"
          />
          {user.fullName}
          <BiSolidChevronDown className="text-primary" />
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
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/profile/edit"
                  className={`${
                    active ? "bg-primary text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  Edit Profile
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-red-500 text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  onClick={async () => {
                    const res = await UserAPI.logut();
                    if (res.statusText == "OK") {
                      dispatch({ type: "LOGOUT" });
                    }
                  }}
                >
                  Log out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Navbar;
