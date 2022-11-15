import { useState } from "react";
import submitHandler from "../../backend/helper/auth/login";
import Link from "next/link";
import Footer from "../footer/Footer";

const Login = () => {
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });

  return (
    <>
      <section className="bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-rose-400 via-fuchsia-500 to-white grid sm:grid-cols-2">
        <span className=" w-full">
        </span>

        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto w-full md:h-screen lg:py-0 backdrop-blur-3xl bg-white/80 rounded-l-[200px] shadow z-10">
          <div className="w-full md:mt-0 sm:max-w-md xl:p-">
            <div className=" space-y-4 md:space-y-6   align-middle md:align-top">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-6xl text-center">
                Welcome Back!
              </h1>
              <h2 className="text-xl leading-tight tracking-tight text-gray-900 text-center">
                Sign in to your account
              </h2>
              <form
                className="px-6 pb-6 space-y-4 md:space-y-6 sm:px-8 sm:pb-8"
                onSubmit={(e) =>
                  submitHandler(e, userInfo.email, userInfo.password)
                }
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="ID@rmit.edu.vn"
                    required
                    value={userInfo.email}
                    onChange={({ target }) =>
                      setUserInfo({ ...userInfo, email: target.value })
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                    value={userInfo.password}
                    onChange={({ target }) =>
                      setUserInfo({ ...userInfo, password: target.value })
                    }
                  />
                </div>

                
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                        required=""
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="remember" className="text-gray-500 ">
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="text-sm font-medium text-primary-600 hover:underline "
                  >
                    Forgot password?
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full  bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-white text-center"
                >
                  Sign in
                </button>
                <p className="text-sm font-light text-gray-500 ">
                  Don’t have an account yet?
                  <Link href="../signup">
                    <a className="font-medium text-primary-600 hover:underline">
                      {" "}
                      Sign up
                    </a>
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer></Footer>
    </>
  );
};

export default Login;
