// BACKEND
import { useSession } from "next-auth/react";
import connectDB from "../../backend/lib/connectDB";
import importRawData from "../../backend/helper/data/data";
import mongoose from "mongoose";

// model
import Users from "../../backend/models/user";
import Major from "../../backend/models/major";
import Post from "../../backend/models/post";
import Course from "../../backend/models/course";

// COMPONENT
import UserInformation from "../../components/users/UserInformation";
import EditProfileForm from "../../components/users/EditProfileForm";
import DisplayPost from "../../pageComponents/post/DisplayPost";
import {Account} from "../../pageComponents/user/Account";

export async function getServerSideProps({ params }) {
  await connectDB();
  const majorData = await Major.find({}, "name");
  const majors = importRawData(majorData, ["_id"], null);

  let Info = {};
  let posts = [];
  if (mongoose.Types.ObjectId.isValid(params.id)) {
    const userData = await Users.findById(
      params.id,
      "_id username email campus major_id"
    ).populate("major_id", "name -_id", Major);
    const postData = await Post.find(
      { userID: params.id },
      "courseID content currentDate"
    ).populate("courseID", "name -_id", Course);
    posts = importRawData(postData, ["_id"], null);
    if (userData !== null) {
      Info = {
        _id: userData._id.toString(),
        username: userData.username,
        email: userData.email,
        campus: userData.campus,
        major: userData.major_id.name,
      };
    }
  }

  return {
    props: {
      Info,
      majorProps: majors,
      postProps: posts,
    },
  };
}

export default function Detail({ Info, majorProps, postProps }) {
  const { data: session } = useSession();
  if (session.user._id === Info._id) {
    return (
      <>
        <div className="h-full bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-300 via-indigo-400 to-indigo-500">
          <Header />

          {/* <div className="bg-white">
            <div className="flex justify-center w-screen h-screen px-4 text-gray-700">
              <div className="flex w-4/6">
                <div className="flex flex-col flex-grow border-l border-r border-gray-300">
                  <div className="flex justify-between flex-shrink-0 px-8 py-4 border-b border-gray-300">
                    <h1 className="text-xl font-semibold">Feed Title</h1>
                  </div>
                  <div className="flex-grow h-0 overflow-auto">
                    <div className="w-full">
                      <Account
                        Info={Info}
                        tag={
                          <EditProfileForm
                            id={Info._id}
                            PreCampus={Info.campus}
                            PreMajor={Info.major}
                            PreUsername={Info.username}
                            majorProps={majorProps}
                          />
                        }
                        majorProps={majorProps}
                        postProps={postProps}
                        session={session}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col flex-shrink-0 w-1/4 py-4 pl-4">
                  <div className="pt-2 relative mx-auto text-gray-600"></div>
                  <div className="flex-grow h-0 overflow-autos"></div>
                </div>
              </div>
            </div>
          </div> */}

          <div>
            <div className="container mx-auto px-4">
              <div className="bg-white w-full shadow-xl rounded-lg">
                <div className="px-6">
                  <div className="mt-10 py-10 border-t border-blueGray-200">
                    <div className="flex flex-wrap justify-center">
                      <div className="w-full lg:w-9/12 px-4">
                        <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                          <div className="mx-auto h-[10rem] w-[10rem] rounded-full bg-slate-400 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-300 via-indigo-400 to-indigo-500"></div>

                          <Account
                            Info={Info}
                            tag={
                              <EditProfileForm
                                id={Info._id}
                                PreCampus={Info.campus}
                                PreMajor={Info.major}
                                PreUsername={Info.username}
                                majorProps={majorProps}
                              />
                            }
                            majorProps={majorProps}
                            postProps={postProps}
                            session={session}
                          />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    //Normal account
    <div>
      <UserInformation
        username={Info.username}
        email={Info.email}
        campus={Info.campus}
        major={Info.major}
      />
      <br />
      {postProps.map((post) => (
        <div key={post._id}>
          <DisplayPost
            author={Info.username}
            date={post.currentDate}
            content={post.content}
            course={post.courseID.name}
            id={post._id}
            sessionName={session.user._id}
            username={Info._id}
          />
        </div>
      ))}
    </div>
  );
}

Detail.auth = true;
