import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link";
import CreatePost from "../components/posts/CreatePost"
export default function Home() {
  const { data: session } = useSession()
  console.log(session)
  if (session) {
    return (
      <>
        <div className="header">
          Signed in as {session.user.email} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </div>
        <CreatePost />
      </>
    )
  }
  return (
    <>
      <div className="header">
        Not signed in <br />
        <button onClick={() => signIn()}>Sign in</button>
        <Link href={"/signup"}>Sign Up</Link>
      </div>
    </>
  )
}