/* eslint-disable @next/next/no-img-element */
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import connectMongo from "../backend/lib/connectDB";
import CreatePost from "../components/posts/CreatePost";
import Course from "../backend/models/course";
import Post from "../backend/models/post";
import User from "../backend/models/user";
import DisplayPost from "../components/posts/DisplayPost";
import Header from "../components/header/Header";
import HeroSection from "../components/landing/heroSection";
import FeatureSections from "../components/landing/featureSections";
import TeamSection from "../components/landing/TeamSection";

export async function getServerSideProps() {
  await connectMongo();
  const data = await Course.find({}, "name");

  const courses = data.map((doc) => {
    const course = doc.toObject();
    course._id = course._id.toString();
    return course;
  });

  const postData = await Post.find({});
  const posts = await Promise.all(
    postData.map(async (doc) => {
      const post = doc.toObject();
      post._id = post._id.toString();
      post.userID = post.userID.toString();

      const course = await Course.findById(
        post.courseID.toString(),
        "name"
      ).lean();
      post.courseID = course["name"];

      const user = await User.findById(
        post.userID.toString(),
        "username"
      ).lean();
      post.userID = user["username"];
      return post;
    })
  );

  return {
    props: {
      courseProps: courses,
      postProps: posts,
    },
  };
}

export default function Home({ courseProps, postProps }) {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <div className="header">
          Signed in as {session.user.email} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </div>
        <CreatePost courseProps={courseProps} id={session.user._id} />

        {postProps.map((post) => (
          <div key={post._id}>
            <DisplayPost
              author={post.userID}
              date={post.currentDate}
              content={post.content}
              course={post.courseID}
              id={post._id}
            />
          </div>
        ))}
      </>
    );
  }
  return (
    <>
      {/* Header */}
      <Header></Header>

      {/* Hero Section */}
      {/* <section className="header flex justify-center">
        Not signed in <br />
        <button
          onClick={() => signIn()}
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Sign in
        </button>
        <Link href={"/signup"} className="border-2 border-indigo-500">
          <div className="font-medium text-indigo-600 hover:text-indigo-500 ">
            Sign Up
          </div>
        </Link>
      </section> */}

      <HeroSection></HeroSection>

      {/* Feature Sections */}
      <FeatureSections></FeatureSections>

      {/* Team Section */}
      <TeamSection></TeamSection>

    </>
  );
}
