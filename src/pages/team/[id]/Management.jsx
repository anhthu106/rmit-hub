// BACKEND
import { useSession } from "next-auth/react";
import connectDB from "../../../backend/lib/connectDB";
import { deleteItems } from "../../../backend/helper/items/items";
import importRawData from "../../../backend/helper/data/data";
import { Types } from "mongoose";
import { useState } from "react";

// MODEL
import Teams from "../../../backend/models/team";
import Users from "../../../backend/models/user";
import Majors from "../../../backend/models/major";

// COMPONENT
import EditTeam from "../../../components/team/EditTeam";
import PendingList from "../../../pageComponents/team/PendingList";
import DisplayTeamMembers from "../../../pageComponents/team/DisplayTeamMembers";
import Header from "../../../components/header/Header";
import { Button } from "../../../components/button/Button";
import SideBar from "../../../components/sidebar/SideBar";
import NotFoundPage from "../../../components/error/NotFoundPage"

export async function getServerSideProps({ params }) {
  await connectDB();
  let teamData;
  if (Types.ObjectId.isValid(params.id)) {
    teamData = await Teams.findById(
      params.id,
      "pending userID courseID name Description"
    );
  }
  let team = {}
  let userPending = [];
  let userDataPending;
  let user = [];
  let userData;

  if (teamData != null) {
    team = {
      id: teamData._id.toString(),
      leader: teamData.userID[0].toString(),
      courseID: teamData.courseID.toString(),
      name: teamData.name.toString(),
      Description: teamData.Description.toString(),
    };

    // preName, ok
    // preCourse,
    // preDescription,
    // courseProps,
    // id, ok

    for (let i of teamData.pending) {
      userDataPending = await Users.findById(
        i,
        "image username email campus major_id"
      ).populate("major_id", "name -_id", Majors);
      userPending.push(userDataPending);
    }

    for (let x of teamData.userID) {
      userData = await Users.findById(
        x,
        "image username email campus major_id"
      ).populate("major_id", "name -_id", Majors);
      user.push(userData);
    }
  }
  userPending = importRawData(userPending, ["_id"], null);

  user = importRawData(user, ["_id"], null);

  return {
    props: {
      userPending: userPending,
      userProps: user,
      team,
    },
  };
}

export default function Management({ userProps, userPending, team }) {
  const { data: session } = useSession();
  const currentUser = session.user._id;
  const [message, setMessage] = useState(null);

  if (Object.keys(team).length == 0) {
    return <NotFoundPage />;
  }
  if (currentUser === team.leader) {
    return (
      <div className="bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200 min-h-screen">
        <Header />

        <div className="text-gray-700">
          <div className="flex-col w-screen max-h-screen ">
            <div className="md:px-10 px-3 pt-6  ">
              <h1 className="text-2xl font-bold ">{team.name}</h1>

              <div className="flex">
                <SideBar teamID={team.id} state1={0} state2={1} />
                <section className="w-3/4">
                  <div className="pt-6 px-4">
                    <div className="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
                      <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8  2xl:col-span-2">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex-shrink-0">
                            <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                              Edit Team Gonna Go Here
                            </span>
                            <h3 className="text-base font-normal text-gray-500">
                              Depression
                            </h3>
                          </div>
                          <div className="flex items-center justify-end flex-1 text-green-500 text-base font-bold">
                            100%
                            <svg
                              className="w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </div>
                        </div>
                        TODO Anh Đông kéo mấy cái còn thiếu từ backend vô giúp
                        em
                        {/* <EditTeam
                          preName= {team.name}
                          preCourse= {}
                          preDescription= {team.Description}
                          courseProps= {}
                          id= {team.id}
                        /> */}
                      </div>
                      <DisplayTeamMembers userProps={userProps} team={team} />
                    </div>

                    <PendingList team={team} userPending={userPending} />

                    <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                      <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                              Delete Team
                            </span>
                          </div>
                          <Button
                            type={"button"}
                            style="ml-5 w-0 flex items-center justify-end flex-1 text-red-500 text-base font-bold hover:bg-red-300"
                            fn={(e) => {
                              deleteItems(null, e, setMessage, `../../api/team/${team.id}`);
                              window.setTimeout(function () {
                                location.replace("../../");
                              }, 1000);
                            }}
                            options={"Delete Team"}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  else {
    return <div>You do not have authorization to access to this page!</div>;
  }
}

Management.auth = true;
