

import { useState } from "react"
import { signIn } from "next-auth/react";

const Login = () => {
    const [userInfo, setUserInfo] = useState({ email: "", password: "" });

    const submitHandler = async (e) => {
        e.preventDefault()

        const res = await signIn('credentials', {
            email: userInfo.email,
            password: userInfo.password,
            redirect: true,
            callbackUrl: '/'
        })
    }

    return (
        <div>
            <form onSubmit={(e) => submitHandler(e)}>
                <div>
                    <label
                        htmlFor="email">
                        Email
                    </label>
                    <input
                        required
                        id="email"
                        type="email"
                        placeholder="email"
                        value={userInfo.email}
                        onChange={({ target }) =>
                            setUserInfo({ ...userInfo, email: target.value })
                        }
                    />
                </div>

                <div>
                    <label
                        htmlFor="password">
                        Password
                    </label>
                    <input
                        value={userInfo.password}
                        onChange={({ target }) =>
                            setUserInfo({ ...userInfo, password: target.value })
                        }
                        required
                        id="password"
                        type="password"
                        placeholder="password"
                        rows={10}
                    />
                </div>

                <div>
                    <button
                        type='submit'>
                        Sign in
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;