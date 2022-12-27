import { Button } from "../../components/button/Button";
import { deleteItems } from "../../backend/helper/items/items";
import { useState } from "react";
import Image from "next/image";
export default function DisplayTeamMembers({ userProps, team, url }) {
  const [message, setMessage] = useState(null);
  return (
    <div>
      <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Team Members
            </h3>
          </div>
        </div>
        <div className="flex flex-col mt-8">
          <div className="overflow-x-auto rounded-lg">
            <div className="align-middle inline-block min-w-full">
              <div className="shadow overflow-hidden sm:rounded-lg">
                <div className="flow-root">
                  <ul role="list" className="divide-y divide-gray-200">
                    {userProps.map((user) => {
                      return (
                        <li
                          key={user._id}
                          className="first:pb-4 first:pt-0 last:pb-0 last:pt-4 [&:not(:first-child,:last-child)]:py-4"
                        >
                          <div className="flex items-center space-x-4 ">
                            <Image
                            key={user.image.imgURL}
                            className="rounded-full"
                            src={user.image.imgURL}
                            alt="avatar"
                            width="32"
                            height="32"
                          />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {user.username}
                              </p>
                            </div>
                            <div className="inline-flex items-center text-base font-semibold">
                              <Button
                                type={"button"}
                                options={"Kick"}
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
