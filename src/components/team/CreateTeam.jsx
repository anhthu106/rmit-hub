import makeAnimated from "react-select/animated";
import { useState } from "react";
import Select from "react-select";
import { util } from "../../utils/utils";
import { addItems } from "../../backend/helper/items/items";

export default function CreateTeam({ courseProps, OwnerUser }) {
  const animated = makeAnimated();
  const courseOptions = util.item(courseProps, "name");

  const [name, setName] = useState();
  const [course, setCourse] = useState();
  const [description, setDescription] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState(null);
  return (
    <div>
      <div data-dial-init className="right-6 bottom-6 group z-50">
        <button
          type="button"
          onClick={() => setShowModal(true)}
          data-dial-toggle="speed-dial-menu-square"
          aria-controls="speed-dial-menu-square"
          aria-expanded="false"
          className="flex justify-center items-center w-14 h-14 text-white bg-blue-700 rounded-lg hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"
        >
          <svg
            aria-hidden="true"
            className="w-8 h-8 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path>
          </svg>

          <span className="sr-only">Open actions menu</span>
        </button>
      </div>
      {showModal ? (
        <>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40"
              onClick={() => setShowModal(false)}
            ></div>
            <div className="flex items-center min-h-screen px-4 py-8">
              <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                <div className="mt-3 ">
                  <div className="mt-2 text-center sm:ml-4 sm:text-left">
                    <h1 className="text-xl font-medium leading-tight tracking-tight text-gray-900 md:text-3xl text-center">
                      Create New Team
                    </h1>
                    <form className="w-full pb-6 space-y-4 md:space-y-6 sm:pb-8 pt-8">
                      <div className="mb-4 border border-gray-200 rounded-lg bg-gray-50">
                        <div className="px-4 py-2 bg-white rounded-t-lg">
                          <div className="pb-4 md:pb-6 space-y-5">
                            <div>
                              <label
                                htmlFor="name"
                                className="block mb-2 text-2xl font-medium text-gray-900 "
                              >
                                Team name
                              </label>
                              <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                value={name}
                                placeholder={"Name..."}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full text-lg text-gray-900 bg-white focus:ring-1 resize-none rounded-md border border-gray-300"
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="course"
                                className="block mb-2 text-2xl font-medium text-gray-900 "
                              >
                                Course
                              </label>
                              <Select
                                onChange={(course) => setCourse(course.label)}
                                closeMenuOnSelect={false}
                                components={animated}
                                placeholder={course}
                                options={courseOptions}
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="description"
                                className="block mb-2 text-2xl font-medium text-gray-900 "
                              >
                                Description
                              </label>
                              <textarea
                                type="text"
                                id="description"
                                name="description"
                                placeholder={"Description..."}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full text-lg text-gray-900 bg-white focus:ring-1 resize-none rounded-md border border-gray-300"
                                />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="items-center gap-2 mt-3 sm:flex">
                        <button
                          type="submit"
                          className="w-full mt-2 p-2.5 flex-1 text-white bg-blue-700 rounded-md outline-none ring-offset-2 ring-blue-700 focus:ring-2"
                          onClick={(e) =>
                            addItems(
                              {
                                name,
                                course,
                                description,
                                userID: OwnerUser,
                              },
                              e,
                              setMessage,
                              "api/team"
                            )
                          }
                        >
                          Create Team
                        </button>
                        <button
                          className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                          onClick={() => setShowModal(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>

                    <div className="items-center gap-2 mt-3 sm:flex"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}

      <div>{message}</div>
    </div>
  );
}
