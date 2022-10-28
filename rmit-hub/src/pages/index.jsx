import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link";
import connectMongo from "../backend/lib/connectDB";
import CreatePost from "../components/posts/CreatePost"
import Course from "../backend/models/course"

export async function getServerSideProps() {
  await connectMongo()
  const data = await Course.find({}, "name")

  const courses = data.map((doc) => {
    const course = doc.toObject();
    course._id = course._id.toString()
    return course
  })

  return { props: { courseProps: courses } }
}


export default function Home({ courseProps }) {
  const { data: session } = useSession()

  if (session) {
    return (
      <>
        <div className="header">
          Signed in as {session.user.email} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </div>
        <CreatePost courseProps={courseProps} />
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