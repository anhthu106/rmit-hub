import { Button } from "../button/Button";
import { deleteItems } from "../../backend/helper/items/items";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function DisplayTeamMembers({ userProps, team, session }) {
  
  return (
    <div className="">
      <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Team Members
            </h3>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="overflow-x-hidden rounded-lg">
            <div className="align-middle inline-block min-w-full">
              <div className="shadow sm:rounded-lg">
                <div className="flow-root">
                  <ul role="list" className="divide-y divide-gray-200">
                    {userProps.map((user) => {
                      if (session.user._id === team.leader) {
                        if (user._id !== team.leader) {
                          return (
                            <DisplayWithButton
                              key={user._id}
                              button={"Kick"}
                              user={user}
                              team={team}
                            />
                          );
                        }
                      } else {
                        if (user._id === session.user._id) {
                          return (
                            <DisplayWithButton
                              key={user._id}
                              user={user}
                              team={team}
                              button={"Leave"}
                            />
                          );
                        }
                      }
                      return (
                        <DisplayWithoutButton key={user._id} user={user} />
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DisplayWithoutButton({ user }) {
  return (
    <li
      key={user._id}
      className="first:pb-4 first:pt-0 last:pb-0 last:pt-4 [&:not(:first-child,:last-child)]:py-4"
    >
      <div className="flex items-center sm:space-x-4 space-x-2">
        <Image
          key={user.image.imgURL}
          className="rounded-full"
          src={user.image.imgURL}
          alt="avatar"
          width="32"
          height="32"
        />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 break-all">
            {user.username}
          </p>
        </div>
      </div>
    </li>
  );
}

function DisplayWithButton({ user, button, team }) {
  const [message, setMessage] = useState(null);
  function reloadHandler() {
    if (message === "User Deleted") {
      window.setTimeout(function () {
        location.reload();
      }, 300);
    }
  }
  useEffect(() => {
    reloadHandler();
  });
  return (
    <li
      key={user._id}
      className="first:pb-4 first:pt-0 last:pb-0 last:pt-4 [&:not(:first-child,:last-child)]:py-4"
    >
      <div className="flex items-center sm:space-x-4 space-x-2">
        <Image
          key={user.image.imgURL}
          className="rounded-full"
          src={user.image.imgURL}
          alt="avatar"
          width="32"
          height="32"
        />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 break-all">
            {user.username}
          </p>
        </div>
        <div className="inline-flex items-center text-base font-semibold">
          <Button
            type={"button"}
            options={button}
            fn={(e) => {
              deleteItems(
                { userID: user._id },
                e,
                setMessage,
                `../../api/team/${team.id}`
              );
            }}
            style="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2"
          />
        </div>
      </div>
    </li>
  );
}
