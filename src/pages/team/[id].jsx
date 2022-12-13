import { resetServerContext } from "react-beautiful-dnd";

// BACKEND
import connectDB from "../../backend/lib/connectDB";
import importRawData from "../../backend/helper/data/data";

// MODELS
import Course from "../../backend/models/course";
import Teams from "../../backend/models/team";
import List from "../../backend/models/list";
import Task from "../../backend/models/task";
import Users from "../../backend/models/user";

// COMPONENT
import Board from "../../components/workspace/Board";
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
    <div className="bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200 h-screen ">
      <Header />

      <div className="text-gray-700">
        <div className="flex flex-col w-screen max-h-screen ">
          <div className="px-10 pt-6  ">
            <h1 className="text-2xl font-bold ">{TeamInfo.name}</h1>

            <Board
              listProps={listProps}
              usernameProps={userName}
              TeamInfo={TeamInfo}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
