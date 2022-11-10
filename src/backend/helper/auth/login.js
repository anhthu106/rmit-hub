import { signIn } from "next-auth/react";

export default async function submitHandler(e, email, password) {
    e.preventDefault()

    const res = await signIn('credentials', {
        email: email,
        password: password,
        redirect: true,
        callbackUrl: '/'
    })
}