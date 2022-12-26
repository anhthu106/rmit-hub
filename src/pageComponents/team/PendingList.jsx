import {useState} from "react";
import Link from "next/link";
import Image from "next/image";
import {Button} from "../../components/button/Button";
import {addItems} from "../../backend/helper/items/items";

export default function PendingList({userPending, team}) {
    const [message, setMessage] = useState("");
    return (
        <div>
            {/* {userPending.map((user) => (
          <div key={user._id}>
            <div className="card w-96 mx-auto bg-white  shadow-xl hover:shadow">
              <div className="w-fit mx-auto">
                <Image
                    key={user.image.imgURL}
                    className="rounded-full"
                    src={user.image.imgURL}
                    alt="avatar"
                    width='150'
                    height='150'
                /></div>

              <div className="text-center mt-2 text-3xl font-medium">
                {user.username}
              </div>
              <div className="text-center mt-2 font-light text-sm">
                {user.email}
              </div>
              <div className="text-center mt-2 font-light text-sm">
                {user.campus}
              </div>
              <div className="px-6 text-center mt-2 font-light text-sm">
                <p>{user.major_id.name}</p>
              </div>
              <hr className="mt-8" />
              <div className="flex p-4 space-x-2">
                <div className="w-1/2">
                  <Button
                  style= "w-full bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-white text-center"
                    fn={(e) =>
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
                      )
                    }
                    options={"Accept Request"}
                  />
                </div>
                <div className="w-0 border border-gray-300"></div>
                <div className="w-1/2">
                  <Button
                  style = "w-full focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5"
                    fn={(e) =>
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
                      )
                    }
                    options={"Reject Request"}
                  />
                </div>
              </div>
            </div>
          </div>
        ))} */}


            <section
                className="bg-white bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200  min-h-[calc(100vh-62px)]">
                <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
                    <div className="grid gap-8 lg:gap-16 md:grid-cols-2 lg:grid-cols-3">
                        {userPending.map((user) => (
                            <div key={user._id}>
                                <div className="card w-96 mx-auto bg-white  shadow-xl hover:shadow">
                                    <Link href={`/users/${user._id}`}>
                                        <a>
                                            <div className="w-fit mx-auto pt-3">
                                                <Image
                                                    key={user.image.imgURL}
                                                    className="rounded-full"
                                                    src={user.image.imgURL}
                                                    alt="avatar"
                                                    width="150"
                                                    height="150"
                                                />
                                            </div>

                                            <div className="text-center mt-2 text-3xl font-medium">
                                                {user.username}
                                            </div>
                                            <div className="text-center mt-2 font-light text-sm">
                                                {user.email}
                                            </div>
                                            <div className="text-center mt-2 font-light text-sm">
                                                {user.campus}
                                            </div>
                                            <div className="px-6 text-center mt-2 font-light text-sm">
                                                <p>{user.major_id.name}</p>
                                            </div>
                                        </a>
                                    </Link>

                                    <hr className="mt-8"/>

                                    <div className="flex p-4 space-x-2">
                                        <div className="w-1/2">
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
                                                options={"Accept Request"}
                                            />
                                        </div>
                                        <div className="w-0 border border-gray-300"></div>
                                        <div className="w-1/2">
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
                                                options={"Reject Request"}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
