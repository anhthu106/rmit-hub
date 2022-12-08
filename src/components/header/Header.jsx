import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { Dropdown, Navbar } from "flowbite-react";

export default function Header() {
  const { data: session } = useSession();
  if (session) {
    return (
      <header>
        <nav>
          <div className="relative bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:justify-start md:space-x-10">
              <Navbar fluid={true}>
                <Navbar.Brand href="../">
                  <Link href="../">
                    <>
                      <span className="sr-only">Your Company</span>
                      Logo?
                    </>
                  </Link>
                </Navbar.Brand>
                <div className="flex md:order-2">
                  <Dropdown label="User">
                    <div className="py-3 px-4 text-sm text-gray-900 dark:text-white">
                      <div className="text-lg">{session.user.username}</div>
                      <div className="font-medium truncate">
                        {session.user.email}
                      </div>
                    </div>
                    <Dropdown.Item>
                      <Link href={`/users/${session.user._id}`}>
                        <a className="w-full">My Account</a>
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <button
                        className="w-full h-full text-left"
                        onClick={() => signOut()}
                      >
                        Sign out
                      </button>
                    </Dropdown.Item>
                  </Dropdown>
                  <Navbar.Toggle />
                </div>
                <Navbar.Collapse>
                  <Navbar.Link
                    href="../"
                    // active={true}
                  >
                    Feed
                  </Navbar.Link>
                  <Navbar.Link href="#">page2</Navbar.Link>
                  <Navbar.Link href="#">page3</Navbar.Link>
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
                <Navbar.Brand href="">
                  <a href="../">
                    <span className="sr-only">Your Company</span>
                    Logo?
                  </a>
                </Navbar.Brand>
                <div className="flex md:order-2">
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
                      <Link
                        href={"../signup"}
                        className="border-2 border-indigo-500"
                      >
                        <div>Sign Up</div>
                      </Link>
                    </a>
                  </div>
                  <Navbar.Toggle />
                </div>
                <Navbar.Collapse className="md:hidden">
                  <Navbar.Link>
                    <a
                      href="#"
                      className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
                    >
                      <button
                        onClick={() => signIn()}
                        className="font-medium text-right text-indigo-600 hover:text-indigo-500 w-full"
                      >
                        Sign in
                      </button>
                    </a>
                  </Navbar.Link>
                  <Navbar.Link>
                    <a href="#">
                      <Link
                        href={"../signup"}
                        className="border-2 border-indigo-500"
                      >
                        <div className="font-medium text-right text-indigo-600 hover:text-indigo-500">
                          Sign Up
                        </div>
                      </Link>
                    </a>
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
