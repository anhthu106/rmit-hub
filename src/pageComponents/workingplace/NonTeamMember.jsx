import { useState } from "react";
import { addItems } from "../../backend/helper/items/items";
import Button from "../../components/button/Button";
import Header from "../../components/header/Header";

export default function NonTeamMember({ TeamInfo, currentUser }) {
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState(false);
  return (
    // TODO Display all team information and joining function
    <div>
      <Header />

      <section className="bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
        {alert ? (
          <>
            <div
              id="alert-border-1"
              class="flex p-4 mb-4 bg-blue-100 border-t-4 border-blue-500 dark:bg-blue-200"
              role="alert"
            >
              <svg
                class="flex-shrink-0 w-5 h-5 text-blue-700"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <div class="ml-3 text-sm font-medium text-blue-700">
                Join request sent! Waiting for teams leader to respond
              </div>
              <button
                type="button"
                class="ml-auto -mx-1.5 -my-1.5 bg-blue-100 dark:bg-blue-200 text-blue-500 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 dark:hover:bg-blue-300 inline-flex h-8 w-8"
                data-dismiss-target="#alert-border-1"
                aria-label="Close"
              >
                <span class="sr-only">Dismiss</span>
                <svg
                  aria-hidden="true"
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
          </>
        ) : null}

        <div className=" flex flex-row justify-center items-center h-[calc(100vh-62px)] w-full">
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
                  // window.location="../";
                  setAlert(true);
                  window.setTimeout(function () {
                    location.reload();
                  }, 3000);
                }}
                options={"Request to join"}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}