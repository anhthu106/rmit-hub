// BACKEND
import { useSession } from "next-auth/react";
import connectDB from "../../../backend/lib/connectDB";
import importRawData from "../../../backend/helper/data/data";
import { Types } from "mongoose";

// MODEL
import Teams from "../../../backend/models/team";
import Users from "../../../backend/models/user";
import Majors from "../../../backend/models/major";
import Course from "../../../backend/models/course";

// COMPONENT
import Header from "../../../components/header/Header";
import SideBar from "../../../components/sidebar/SideBar";
import NotFoundPage from "../../../components/error/NotFoundPage";
import TeamLeaderPage from "../../../pageComponents/team/TeamLeaderPage";
import TeamMemberPage from "../../../pageComponents/team/TeamMemberPage";
import { useRouter } from "next/router";

export async function getServerSideProps({ params }) {
  await connectDB();
  let teamData;
  if (Types.ObjectId.isValid(params.id)) {
    teamData = await Teams.findById(
      params.id,
      "pending userID courseID name Description"
    ).populate("courseID", "name", Course);
  }
  let team = {};
  let userPending = [];
  let userDataPending;
  let user = [];
  let userID = [];
  let userData;

  if (teamData != null) {
    team = {
      id: teamData._id.toString(),
      leader: teamData.userID[0].toString(),
      courseName: teamData.courseID.name,
      name: teamData.name.toString(),
      Description: teamData.Description.toString(),
    };

    for (let i of teamData.pending) {
      userDataPending = await Users.findById(
        i,
        "image username email campus major_id"
      ).populate("major_id", "name -_id", Majors);
      userPending.push(userDataPending);
    }

    for (let x of teamData.userID) {
      userID.push(x.toString());
      userData = await Users.findById(
        x,
        "image username email campus major_id"
      ).populate("major_id", "name -_id", Majors);
      user.push(userData);
    }

    if (userDataPending != null) {
      userPending = importRawData(userPending, ["_id"], null);
    }

    user = importRawData(user, ["_id"], null);
  }
  return {
    props: {
      userPending: userPending,
      userProps: user,
      userID: userID,
      team,
    },
  };
}

export default function Management({ userProps, userPending, team, userID }) {
  const { data: session } = useSession();
  const currentUser = session.user._id;
  const router = useRouter();

  if (Object.keys(team).length === 0) {
    return <NotFoundPage />;
  }

  if (!userID.includes(session.user._id)) {
    router.push("/team");
  } else {
    if (currentUser === team.leader) {
      return (
        <div className="bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200 h-fit">
          <Header />

          <div className="text-gray-700">
            <div className="flex-col w-screen pb-5">
              <div className="md:px-10 px-3 pt-6  ">
                <h1 className="text-2xl font-bold ">{team.name}</h1>
                <div className="sm:flex">
                  <SideBar teamID={team.id} state1={0} state2={1} />
                  <section className="sm:w-4/5 2xl:w-full 2xl:px-40">
                    <TeamLeaderPage
                      team={team}
                      userPending={userPending}
                      userProps={userProps}
                      session={session}
                    />
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200 h-fit">
          <Header />

          <div className="text-gray-700">
            <div className="flex-col w-screen pb-5">
              <div className="md:px-10 px-3 pt-6  ">
                <h1 className="text-2xl font-bold ">{team.name}</h1>
                <div className="sm:flex">
                  <SideBar teamID={team.id} state1={0} state2={1} />
                  <section className="sm:w-4/5 2xl:w-full 2xl:px-40">
                    <TeamMemberPage
                      team={team}
                      userProps={userProps}
                      session={session}
                    />
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

Management.auth = true;
