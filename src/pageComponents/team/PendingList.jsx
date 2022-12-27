import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../../components/button/Button";
import { addItems } from "../../backend/helper/items/items";

export default function PendingList({ userPending, team }) {
  const [message, setMessage] = useState("");
  return (
    <div>
      <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 my-4">
        <div className="mb-4 items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Pending List
            </h3>
            <span className="text-base font-normal text-gray-500">
              This is a list of pending request
            </span>
          </div>
        </div>
        <div className="flex flex-col mt-8">
          <div className="overflow-x-auto rounded-lg">
            <div className="align-middle inline-block min-w-full">
              <div className="shadow overflow-hidden sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr
                      className="[&>*]:p-4 [&>*]:text-center [&>*]:text-xs [&>*]:font-medium [&>*]:text-gray-500 [&>*]:uppercase [&>*]:tracking-wider"
                      scope="[&>*]:col"
                    >
                      <th>Avater</th>
                      <th scope="col">Username</th>
                      <th scope="col">Email</th>
                      <th scope="col">Campus</th>
                      <th scope="col">Major</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {userPending.map((user) => (
                      <tr
                        key={user._id}
                        className="[&>*]:p-4 [&>*]:whitespace-nowrap [&>*]:text-sm [&>*]:font-semibold [&>*]:text-gray-900"
                      >
                        <td className="w-fit mx-auto pt-3">
                          <Image
                            key={user.image.imgURL}
                            className="rounded-full"
                            src={user.image.imgURL}
                            alt="avatar"
                            width="32"
                            height="32"
                          />
                        </td>

                        <td className="">{user.username}</td>
                        <td className="">{user.email}</td>
                        <td className="">{user.campus}</td>
                        <td className="">
                          <p>{user.major_id.name}</p>
                        </td>

                        <td className="flex p-4 space-x-2">
                          <span className="w-1/2">
                            <Button
                              type="button"
                              style="w-full bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-white text-center"
                              fn={(e) => {
                                addItems(
                                  {
                                    teamID: id,
                                    status: "accept",
                                    userID: user._id,
                                    courseID: courseID,
                                  },
                                  e,
                                  setMessage,
                                  "/api/team/pending"
                                );
                                window.setTimeout(function () {
                                  location.reload();
                                }, 2000);
                              }}
                              options={
                                <div>
                                  <span className="lg:block hidden	">
                                    Accept Request
                                  </span>
                                  <svg
                                    className="w-6 h-6 lg:hidden block"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                </div>
                              }
                            />
                          </span>
                          <span className="w-0 border border-gray-300"></span>
                          <span className="w-1/2">
                            <Button
                              type="button"
                              style="w-full focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5"
                              fn={(e) => {
                                addItems(
                                  {
                                    teamID: team,
                                    status: "reject",
                                    userID: user._id,
                                    courseID: courseID,
                                  },
                                  e,
                                  setMessage,
                                  "/api/team/pending"
                                );
                                window.location.reload(false);
                              }}
                              options={
                                <div>
                                  <span className="lg:block hidden">
                                    Reject Request
                                  </span>
                                  <svg
                                    className="w-6 h-6 lg:hidden block"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M6 18L18 6M6 6l12 12"
                                    />
                                  </svg>
                                </div>
                              }
                            />
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
