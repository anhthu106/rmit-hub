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
      <div className="bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-300 via-indigo-400 to-indigo-500">
        <Header></Header>

        <div className="bg-white">
          <div className="flex justify-center w-screen h-screen px-4 text-gray-700">
            <div className="flex w-4/6">
              {/* <div className="w-0 py-4">
                Might Use
              </div> */}
              <div className="flex flex-col flex-grow border-l border-r border-gray-300">
                <div className="flex justify-between flex-shrink-0 px-8 py-4 border-b border-gray-300">
                  <h1 className="text-xl font-semibold">Feed Title</h1>
                </div>
                <div className="flex-grow h-0 overflow-auto">
                  <div className="w-full">
                    <CreatePost
                      courseProps={courseProps}
                      id={session.user._id}
                    />

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
              <div className="flex flex-col flex-shrink-0 w-1/4 py-4 pl-4">
                <div className="pt-2 relative mx-auto text-gray-600">
                  <input
                    className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                    type="search"
                    name="search"
                    placeholder="Search"
                  />
                  <button
                    type="submit"
                    className="absolute right-0 top-0 mt-5 mr-4 w-1 px-5"
                  >
                    <svg
                      className="text-gray-600 h-4 w-4 fill-current"
                      viewBox="0 0 56.966 56.966"
                    >
                      <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                    </svg>
                  </button>
                </div>
                <div className="flex-grow h-0 overflow-autos">
                  <h3 className="mt-6 font-semibold">Your Post</h3>
                  <div className="w-full">
                    <div className="flex w-full py-4 border-b border-gray-300">
                      <span className="flex-shrink-0 w-10 h-10 bg-gray-400 rounded-full"></span>
                      <div className="flex flex-col flex-grow ml-2">
                        <div className="flex text-sm">
                          <span className="font-semibold">Username</span>
                          <span className="ml-1">@username</span>
                        </div>

                        <p className="mt-1 text-sm">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, et dolore magna aliqua.{" "}
                          <a className="underline" href="#">
                            #hashtag
                          </a>
                        </p>
                      </div>
                    </div>
                    <div className="flex w-full py-4 border-b border-gray-300">
                      <span className="flex-shrink-0 w-10 h-10 bg-gray-400 rounded-full"></span>
                      <div className="flex flex-col flex-grow ml-2">
                        <div className="flex text-sm">
                          <span className="font-semibold">Username</span>
                          <span className="ml-1">@username</span>
                        </div>
                        <p className="mt-1 text-sm">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, et dolore magna aliqua.{" "}
                          <a className="underline" href="#">
                            #hashtag
                          </a>
                        </p>
                      </div>
                    </div>
                    <div className="flex w-full py-4 border-b border-gray-300">
                      <span className="flex-shrink-0 w-10 h-10 bg-gray-400 rounded-full"></span>
                      <div className="flex flex-col flex-grow ml-2">
                        <div className="flex text-sm">
                          <span className="font-semibold">Username</span>
                          <span className="ml-1">@username</span>
                        </div>
                        <p className="mt-1 text-sm">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, et dolore magna aliqua.{" "}
                          <a className="underline" href="#">
                            #hashtag
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* old feed */}
        {/* <div className="m-auto md:w-6/12">
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
        </div> */}
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
