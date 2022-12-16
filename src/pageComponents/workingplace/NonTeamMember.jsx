import { useState } from "react";
import { addItems } from "../../backend/helper/items/items";
import Button from "../../components/button/Button";
import Header from "../../components/header/Header";

export default function NonTeamMember({ TeamInfo, currentUser }) {
  const [message, setMessage] = useState("");
  console.log(TeamInfo);
  return (
    // TODO Display all team information and joining function
    <div>
      <Header />

      <section className="bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200 h-[calc(100vh-62px)] w-full flex flex-row justify-center items-center">
        <div className="card w-96 md:mx-auto bg-white rounded-lg  shadow-xl hover:shadow mx-4">
          <div className="w-32 h-32 mx-auto rounded-full -mt-20 border-8 border-white bg-indigo-500"></div>
          <div className="text-center mt-2 text-3xl font-medium">
            {TeamInfo.name}
          </div>
          {/* <div className="text-center mt-2 font-light text-sm">placeholder 1</div> */}
          <div className="text-center font-normal text-lg">
            {TeamInfo.courseName}{" "}
          </div>
          <div className="px-6 text-center mt-2 font-light text-sm">
            <p>{TeamInfo.description}</p>
          </div>
          <hr className="mt-8" />
          <div className="flex p-4">
            <div className="w-1/2 text-center">
              Members <span className="font-bold">{TeamInfo.members}</span>
            </div>
            <div className="w-0 border border-gray-300"></div>
            <div className="w-1/2 text-center">
              <span className="font-bold">
                <ul>
                  {TeamInfo.user.map((member) => (
                    <li key={member}>{member}</li>
                  ))}
                </ul>
              </span>
              <div className="flex -space-x-4 justify-center">
                {/* TODO Anh Dong keo cho em them cai ava nguoi dung vo day la no se nhu the nay */}
                <div className="w-10 h-10 rounded-full border-2 border-white bg-indigo-200"></div>
                <div className="w-10 h-10 rounded-full border-2 border-white bg-indigo-300"></div>
                <div className="w-10 h-10 rounded-full border-2 border-white bg-indigo-400"></div>
                <div className="w-10 h-10 rounded-full border-2 border-white bg-indigo-500"></div>
              </div>
            </div>
          </div>
          <hr />
          <div className="p-5">
            <Button
              fn={(e) =>
                addItems(
                  {
                    currentUser: currentUser,
                    leader: TeamInfo.userId[0],
                    teamID: TeamInfo._id,
                  },
                  e,
                  setMessage,
                  "/api/team/join"
                )
              }
              options={"Request to join"}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
