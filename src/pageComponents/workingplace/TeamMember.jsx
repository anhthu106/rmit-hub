import Header from "../../components/header/Header";
import dynamic from "next/dynamic";
import SideBar from "../../components/sidebar/SideBar";
const Board = dynamic(() => import("../../components/workspace/Board"));

export default function TeamMember({ TeamInfo, listProps, userName }) {
  return (
    <div className="bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200 min-h-screen">
      <Header />
      <div className="text-gray-700">
        <div className="flex-col w-screen max-h-screen ">
          <div className="md:px-10 px-3 pt-6  ">
            <h1 className="text-2xl font-bold ">{TeamInfo.name}</h1>

            <div className="flex space-x-3">
              <SideBar teamID={TeamInfo._id} state1={1} state2={0} />
              <Board
                listProps={listProps}
                usernameProps={userName}
                TeamInfo={TeamInfo}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
