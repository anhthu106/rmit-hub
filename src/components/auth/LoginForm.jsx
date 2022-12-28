import {useState} from "react";
import {useRouter} from "next/router";
import submitHandler from "../../backend/helper/auth/login";
import Link from "next/link";
import {Button} from "../button/Button";

const LoginForm = () => {
    const [userInfo, setUserInfo] = useState({email: "", password: ""});
    const {error} = useRouter().query;

    return (
        <form
            className="px-6 pb-6 space-y-4 md:space-y-6 sm:px-8 sm:pb-8 pt-8"
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
                    onChange={({target}) =>
                        setUserInfo({...userInfo, email: target.value})
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
                    autoComplete={"on"}
                    value={userInfo.password}
                    onChange={({target}) =>
                        setUserInfo({...userInfo, password: target.value})
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

            <Button
                type="submit"
                style="w-full  bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-white text-center"
                fn={(e) => submitHandler(e, userInfo.email, userInfo.password)}
                options={"Sign in"}
            />

            <p className="text-sm font-light text-gray-500 ">
                Don’t have an account yet?
                <Link href="../signup">
                    <a className="font-medium text-primary-600 hover:underline">
                        Sign up
                    </a>
                </Link>
            </p>
        </form>
    );
};

export default LoginForm;
