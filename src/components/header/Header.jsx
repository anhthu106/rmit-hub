import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { Dropdown, Navbar } from "flowbite-react";
import { Button } from "../button/Button";

export default function Header() {
  const { data: session } = useSession();
  if (session) {
    return (
      <header>
        <nav>
          <div className="relative bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:justify-start md:space-x-10">
              <Navbar fluid={true}>
                <Navbar.Brand href="/">
                  <span>
                    <span className="sr-only">Your Company</span>
                    <span className=" text-center font-bold text-white bg-gradient-to-r from-blue-600  to-pink-600 p-2 rounded-lg">
                      RMIT-HUB
                    </span>
                  </span>
                </Navbar.Brand>
                <div className="flex md:order-2">
                  <Dropdown label="User">
                    <div className="py-3 mx-2 px-2 rounded-lg text-sm text-gray-900 hover:bg-indigo-100 hover:text-indigo-700">
                      <a href={`/users/${session.user._id}`}>
                        <div className="text-lg">{session.user.username}</div>
                        <div className="font-medium truncate">
                          {session.user.email}
                        </div>
                      </a>
                    </div>
                    <Dropdown.Item>
                      <Link href={`/users/${session.user._id}`}>
                        <a className="w-full ">My Account</a>
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Button
                        style="w-full h-full text-left"
                        fn={() => signOut()}
                        options={"Sign out"}
                      />
                    </Dropdown.Item>
                  </Dropdown>
                  <Navbar.Toggle />
                </div>
                <Navbar.Collapse>
                  <Navbar.Link
                    href="/"
                  >
                    Feed
                  </Navbar.Link>
                  <Navbar.Link href="/team">Teams</Navbar.Link>
                </Navbar.Collapse>
              </Navbar>
            </div>
          </div>
        </nav>
      </header>
    );
  }
  return (
    <header>
      <nav>
        <div className="relative bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:justify-start md:space-x-10">
              <Navbar fluid={true}>
                <Navbar.Brand href="/">
                  <span className="sr-only">Your Company</span>
                  <span className=" text-center font-bold text-white bg-gradient-to-r from-blue-600  to-pink-600 p-2 rounded-lg">
                      RMIT-HUB
                    </span>
                </Navbar.Brand>
                <div className="flex md:order-2">
                  <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
                    <Link href="#">
                      <a className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
                        <Button
                          style="font-medium text-indigo-600 hover:text-indigo-500"
                          fn={() => signIn()}
                          options={"Sign in"}
                        />
                      </a>
                    </Link>

                    <Link href="#">
                      <a className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                        <Link
                          href={"../signup"}
                          className="border-2 border-indigo-500"
                        >
                          <div>Sign Up</div>
                        </Link>
                      </a>
                    </Link>
                  </div>
                  <Navbar.Toggle />
                </div>
                <Navbar.Collapse className="md:hidden">
                  <Navbar.Link
                    href="#"
                    className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
                  >
                    <Button
                      style="font-medium text-right text-indigo-600 hover:text-indigo-500 w-full"
                      fn={() => signIn()}
                      options={"Sign in"}
                    />
                  </Navbar.Link>
                  <Navbar.Link
                    href={"../signup"}
                    className="border-2 border-indigo-500"
                  >
                    <div className="font-medium text-right text-indigo-600 hover:text-indigo-500">
                      Sign Up
                    </div>
                  </Navbar.Link>
                </Navbar.Collapse>
              </Navbar>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
