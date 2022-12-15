import {useState} from "react";
import {addItems} from "../../backend/helper/items/items";
import Button from "../../components/button/Button";
import Header from "../../components/header/Header";

export default function NonTeamMember({TeamInfo, currentUser}) {
    const [message, setMessage] = useState("");
    return (
        // TODO Display all team information and joining function

        <div>
            <Header/>

            <section
                className="bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200 h-[calc(100vh-62px)] place-items-center grid">
                <div className="container md:px-5 py-5 mx-auto my-auto bg-white border-gray-200 rounded-xl shadow-md">
                    <div className="p-5 flex items-center mx-auto border-b  mb-5 sm:flex-row flex-col ">
                        <div
                            className="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center flex-shrink-0 bg-indigo-500"></div>
                        <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                            <h1 className="text-black text-2xl title-font font-bold mb-2">
                                {TeamInfo.name}
                            </h1>
                            <p className="leading-relaxed text-base">
                                {TeamInfo.description}
                            </p>
                            <div className="py-4"></div>
                            <div className="flex font-bold text-gray-800">
                                <div className="w-full min-w-max space-x-6 flex">
                                    <div className="w-full">
                                        <h2 className="text-gray-500">Member({TeamInfo.members})</h2>
                                        <ul>
                                            {TeamInfo.user.map((member) => (
                                                <li key={member}>{member}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="w-full">
                                        <h2 className="text-gray-500">Course</h2>
                                        <p>{TeamInfo.courseName}</p>
                                    </div>
                                </div>
                            </div>
                            {/* <Link href={`/team/${TeamID}`}>
                  <a className="mt-3 text-indigo-500 font-semibold inline-flex items-center">
                    Learn More
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </a>
                </Link> */}
                        </div>
                    </div>
                    <div className="px-5">
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
