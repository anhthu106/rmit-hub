import { useState, useEffect } from "react";
import { addItems } from "../../backend/helper/items/items";
import Image from "next/image";
import { Button, DisabledButton } from "../../components/button/Button";
import Header from "../../components/header/Header";

export default function NonTeamMember({ TeamInfo, currentUser, section }) {
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState(false);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    PendingCheck();
  });

  function PendingCheck() {
    if (TeamInfo.pendingList.includes(section.user._id)) {
      setPending(true);
    }
  }

  function AlertCheck() {
    window.setTimeout(function () {
      location.reload();
    }, 1000);
    if (message !== "Cannot join the team") {
      return (
        <div
          id="alert-border-1"
          className="flex p-4 mb-4 bg-blue-100 border-t-4 border-blue-500"
          role="alert"
        >
          <svg
            className="flex-shrink-0 w-5 h-5 text-blue-700"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            ></path>
          </svg>
          <div className="ml-3 text-sm font-medium text-blue-700">
            Join request sent! Waiting for teams leader to respond
          </div>
        </div>
      )
    } else {
      return (
        <div
          id="alert-border-2"
          className="flex p-4 mb-4 bg-red-100 border-t-4 border-red-500 "
          role="alert"
        >
          <svg
            className="flex-shrink-0 w-5 h-5 text-red-700"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            ></path>
          </svg>
          <div className="ml-3 text-sm font-medium text-red-700">
            Somethings went wrong! Please try again later.
          </div>
        </div>
      );
    }
  }
  return (
    <div>
      <Header />

      <section className="bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
        {alert ? <>{AlertCheck()}</> : null}

        <div className=" flex flex-row justify-center items-center h-[calc(100vh-62px)] w-full">
          <div className="card w-96 md:mx-auto bg-white rounded-lg  shadow-xl hover:shadow mx-4">
            <div className="text-center mt-5 text-3xl font-medium">
              {TeamInfo.name}
            </div>
            <div className="text-center font-normal text-lg">
              {TeamInfo.courseName}
            </div>
            <div className="px-6 text-center mt-2 font-light text-sm">
              <p>{TeamInfo.description}</p>
            </div>
            <hr className="mt-8" />
            <div className="flex p-4">
              <div className="w-1/2 text-center m-auto">
                Members <span className="font-bold">{TeamInfo.members}</span>
              </div>
              <div className="w-0 border border-gray-300"></div>
              <div className="w-1/2 text-center px-2">
                <div className="flex -space-x-4 justify-center">
                  {TeamInfo.userPicture.map((imgUrl) => (
                    <div
                      key={imgUrl.imgURL}
                      className="w-10 h-10 rounded-full border-2 border-gray-500-700"
                    >
                      <Image
                        className="rounded-full"
                        src={imgUrl.imgURL}
                        alt="ava"
                        width="40px"
                        height="40px"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <hr />
            <div className="p-5">
              {pending ? (
                <>
                  <DisabledButton
                    type="button"
                    style="w-full text-white bg-blue-400 dark:bg-blue-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    options={"Pending..."}
                  />
                </>
              ) : (
                <Button
                  type="button"
                  style="w-full  bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-white text-center"
                  fn={(e) => {
                    addItems(
                      {
                        currentUser: currentUser,
                        leader: TeamInfo.userId[0],
                        teamID: TeamInfo._id,
                      },
                      e,
                      setMessage,
                      "/api/team/join"
                    );
                    setAlert(true);
                  }}
                  options={"Request to join"}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
