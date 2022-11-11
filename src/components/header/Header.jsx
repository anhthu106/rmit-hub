import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function Header() {
  return (
    <header>
      <div className="relative bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center justify-between border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <a href="#">
                <span className="sr-only">Your Company</span>
                Logo?
              </a>
            </div>
            <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
              <a
                href="#"
                className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
              >
                <button
                  onClick={() => signIn()}
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Sign in
                </button>
              </a>
              <a
                href="#"
                className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                <Link href={"/signup"} className="border-2 border-indigo-500">
                  <div>
                    Sign Up
                  </div>
                </Link>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
