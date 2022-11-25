/* eslint-disable @next/next/no-img-element */
// BACKEND
import { useSession, signOut } from "next-auth/react";
import connectMongo from "../backend/lib/connectDB";
// model
import Course from "../backend/models/course";
import Post from "../backend/models/post";
import User from "../backend/models/user";
import { Dropdown } from "flowbite-react";

// COMPONENT
import CreatePost from "../components/posts/CreatePost";
import DisplayPost from "../components/posts/DisplayPost";
import Header from "../components/header/Header";
import HeroSection from "../components/landing/HeroSection";
import FeatureSections from "../components/landing/FeatureSections";
import TeamSection from "../components/landing/TeamSection";
import Footer from "../components/footer/Footer";

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
      <div
        className="bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-300 via-indigo-400 to-indigo-500"
      >
        <Header></Header>

        {/* new */}
        <div className="m-auto md:w-6/12">
          <div>
            <CreatePost courseProps={courseProps} id={session.user._id} />

            {postProps.map((post) => (
              <div key={post._id}>
                <DisplayPost
                  author={post.userID}
                  date={post.currentDate}
                  content={post.content}
                  course={post.courseID}
                  id={post._id}
                  sessionName={session.user.username}
                  username={post.userID}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      {/* Header */}
      <Header></Header>

      <HeroSection></HeroSection>

      {/* Feature Sections */}
      <FeatureSections></FeatureSections>

      {/* Team Section */}
      <TeamSection></TeamSection>

      {/* Footer */}
      <Footer></Footer>
    </>
  );
}
