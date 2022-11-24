import { useState } from "react";
import submitHandler from "../../backend/helper/auth/login";
import Link from "next/link";
import { useRouter } from "next/router";
const Login = () => {
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const { error } = useRouter().query;
  return (
    <>
      <section className="bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-300 via-indigo-400 to-indigo-500 grid h-screen">
        <span>
          {/* <img
            className="scale-[0.7] z-0 absolute -left-4"
            src="data:image/svg+xml;base64,PCEtLT94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/LS0+CiAgICAgICAgICAgICAgPHN2ZyBpZD0ic3ctanMtYmxvYi1zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSI+CiAgICAgICAgICAgICAgICAgICAgPGRlZnM+IAogICAgICAgICAgICAgICAgICAgICAgICA8bGluZWFyR3JhZGllbnQgaWQ9InN3LWdyYWRpZW50IiB4MT0iMCIgeDI9IjEiIHkxPSIxIiB5Mj0iMCI+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3RvcCBpZD0ic3RvcDEiIHN0b3AtY29sb3I9InJnYmEoMjE1LjIyNywgMjE1LjIyNywgMjE1LjIyNywgMC44NSkiIG9mZnNldD0iMCUiPjwvc3RvcD4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzdG9wIGlkPSJzdG9wMiIgc3RvcC1jb2xvcj0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjc0KSIgb2Zmc2V0PSIxMDAlIj48L3N0b3A+CiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICAgICAgICAgICAgICAgICAgPC9kZWZzPgogICAgICAgICAgICAgICAgPHBhdGggZmlsbD0idXJsKCNzdy1ncmFkaWVudCkiIGQ9Ik0xNywtMjcuNkMyMi4zLC0yNi4zLDI3LC0yMi40LDMxLjMsLTE3LjNDMzUuNiwtMTIuMiwzOS40LC02LjEsMzkuOSwwLjJDNDAuMyw2LjYsMzcuMywxMy4yLDM0LjEsMjAuMUMzMC44LDI3LDI3LjQsMzQuMiwyMS42LDM1LjJDMTUuOSwzNi4xLDgsMzAuOSwxLjQsMjguNUMtNS4xLDI2LC0xMC4yLDI2LjIsLTE2LDI1LjNDLTIxLjcsMjQuMywtMjguMiwyMi4yLC0zMC43LDE3LjdDLTMzLjEsMTMuMywtMzEuNiw2LjcsLTMxLjksLTAuMkMtMzIuMiwtNywtMzQuMywtMTQsLTMyLjUsLTE5LjVDLTMwLjYsLTI1LjEsLTI0LjksLTI5LjIsLTE4LjksLTMwQy0xMi44LC0zMC44LC02LjQsLTI4LjMsLTAuMywtMjcuOEM1LjgsLTI3LjMsMTEuNywtMjguOCwxNywtMjcuNloiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDUwIDUwKSIgc3Ryb2tlLXdpZHRoPSIwIiBzdHlsZT0idHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZSAwczsiIHN0cm9rZT0idXJsKCNzdy1ncmFkaWVudCkiPjwvcGF0aD4KICAgICAgICAgICAgICA8L3N2Zz4="
          /> */}
        </span>
        <div className="opacity-[1] flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-min lg:py-0 z-10 rounded-[50px] drop-shadow-2xl md:mt-0 sm:max-w-screen xl:p-0 ">
          <div className="w-full md:mt-0 sm:max-w-md xl:p-0">
            <div className="align-middle md:align-top w-full">
              <div className="bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-pink-500 via-red-500 to-yellow-500 rounded-t-[50px] h-fit p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-5xl text-center">
                  Welcome Back!
                </h1>
                <h2 className="text-xl leading-tight tracking-tight text-gray-900 text-center">
                  Sign in to your account
                </h2>
              </div>
              <div className="bg-white rounded-b-[50px] pt-0">
                <form
                  className="px-6 pb-6 space-y-4 md:space-y-6 sm:px-8 sm:pb-8 pt-8"
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
                  {/* {error && (
                  <p className="mt-2 text-sm text-red-600">
                    We do not recognize the email or password. Please try again.
                  </p>
                )} */}
                  <span className="mt-2 text-sm text-red-600">{error}</span>
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
                      href="../recover"
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
        </div>
      </section>
    </>
  );
};
export default Login;
