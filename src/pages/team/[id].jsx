import { resetServerContext } from "react-beautiful-dnd";
import connectDB from "../../backend/lib/connectDB";
import Course from "../../backend/models/course";
import Teams from "../../backend/models/team";
import List from "../../backend/models/list";
import Task from "../../backend/models/task";
import importRawData from "../../backend/helper/data/data";
import Users from "../../backend/models/user";
import Board from "../../components/workspace/Board";
import CreateList from "../../components/workspace/CreateList";
import Header from "../../components/header/Header";

export async function getServerSideProps({ params }) {
  await connectDB();

  const courseData = await Course.find({}, "name");
  const teamData = await Teams.findById(params.id);
  const teamCourse = await Course.findById(
    teamData.courseID.toString(),
    "name"
  );
  const listData = await List.find(
    { team_id: params.id },
    "_id title task_id team_id"
  ).populate("task_id", "_id description username createdDate deadline", Task);
  const list = importRawData(listData, ["_id", "team_id"], null);

  const lists = await Promise.all(
    list.map(async (doc) => {
      doc.task_id.map(async (task) => {
        task._id = task._id.toString();
      });
      return doc;
    })
  );

  const courses = importRawData(courseData, ["_id"], null);

  const userId = teamData.userID.map((data) => {
    return data.toString();
  });

  const userName = await Promise.all(
    teamData.userID.map(async (data) => {
      data = data.toString();
      const user = await Users.findById(data, "username").lean();
      return user["username"];
    })
  );

  const TeamInfo = {
    _id: teamData._id.toString(),
    name: teamData.name,
    courseName: teamCourse.name,
    description: teamData.Description,
    members: teamData.Member,
    userId: userId,
    user: userName,
  };
  resetServerContext();

  return {
    props: {
      TeamInfo,
      courseProps: courses,
      listProps: lists,
      userName: userName,
    },
  };
}

export default function TeamDetail({
  listProps,
  TeamInfo,
  courseProps,
  userName,
}) {
  return (
    <>
    <Header/>
      {/* <div className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600">
        <CreateList teamID={TeamInfo._id} />
        <Board listProps={listProps} usernameProps={userName} />
      </div>

      <div className="bg-blue w-full p-8 flex justify-center font-sans">
        <div className="rounded bg-grey-light w-64 p-2">
          <div className="flex justify-between py-1">
            <h3 className="text-sm">New landing page</h3>
            <svg
              className="h-4 fill-current text-grey-dark cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5 10a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4z" />
            </svg>
          </div>
          <div className="text-sm mt-2">
            <div className="bg-white p-2 rounded mt-1 border-b border-grey cursor-pointer hover:bg-grey-lighter">
              Do a mobile first layout
            </div>

            <div className="bg-white p-2 rounded mt-1 border-b border-grey cursor-pointer hover:bg-grey-lighter">
              Check the meta tags
            </div>

            <div className="bg-white p-2 rounded mt-1 border-b border-grey cursor-pointer hover:bg-grey-lighter">
              Check the responsive layout on all devices
              <div className="text-grey-darker mt-2 ml-2 flex justify-between items-start">
                <span className="text-xs flex items-center">
                  <svg
                    className="h-4 fill-current mr-1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 50 50"
                  >
                    <path d="M11 4c-3.855 0-7 3.145-7 7v28c0 3.855 3.145 7 7 7h28c3.855 0 7-3.145 7-7V11c0-3.855-3.145-7-7-7zm0 2h28c2.773 0 5 2.227 5 5v28c0 2.773-2.227 5-5 5H11c-2.773 0-5-2.227-5-5V11c0-2.773 2.227-5 5-5zm25.234 9.832l-13.32 15.723-8.133-7.586-1.363 1.465 9.664 9.015 14.684-17.324z" />
                  </svg>
                  3/5
                </span>
                <img
                  src="https://i.imgur.com/OZaT7jl.png"
                  className="rounded-full"
                />
              </div>
            </div>
            <p className="mt-3 text-grey-dark">Add a card...</p>
          </div>
        </div>
      </div> */}

      <div className="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
        <div className="px-10 mt-6 overflow-auto">
          <h1 className="text-2xl font-bold">Team Project Board</h1>
          <CreateList teamID={TeamInfo._id} />
        <Board listProps={listProps} usernameProps={userName} />
        </div>

      </div>




    </>
  );
}
