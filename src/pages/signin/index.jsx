import Login from "../../pageComponents/auth/Login"
import {useSession} from "next-auth/react";
import {redirect} from "next/dist/server/api-utils";

export default function SignIn() {
    return (
        <Login/>
    )
}

SignIn.authed = true;
