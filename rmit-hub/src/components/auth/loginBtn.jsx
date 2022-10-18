import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link";

export default function LoginBtn() {
    const { data: session } = useSession()
    if (session) {
        return (
            <>
                Signed in as {session.user.email} <br />
                <button onClick={() => signOut()}>Sign out</button>
                <Link href={`/profile/${session}`}>Profile</Link>

            </>
        )
    }
    return (
        <>
            Not signed in <br />
            <button onClick={() => signIn()}>Sign in</button>
            <Link href={"/signup"}>Sign Up</Link>
        </>
    )
}