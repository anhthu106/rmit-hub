import makeAnimated from "react-select/animated";
import { useState } from "react";
import Select from "react-select";
import { util } from "../../utils/utils";
import { addItems } from "../../backend/helper/items/items";
import { useEffect } from "react";

export default function CreateTeam({ courseProps, OwnerUser }) {
  const animated = makeAnimated();
  const courseOptions = util.item(courseProps, "name");

  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [description, setDescription] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState(null);
  const [formCheck, setFormCheck] = useState(false);
  const [formSent, setFormSent] = useState(false);

  function checkForm() {
    if (description === "" || course === "" || name === null) {
      setFormCheck(false);
    } else {
      setFormCheck(true);
    }
  }

  useEffect(() => {
    checkForm();
  });

  return (
    <div>
      <div data-dial-init className="group z-50 flex justify-center">
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-700/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center my-5"
          onClick={() => setShowModal(true)}
          data-dial-toggle="speed-dial-menu-square"
          aria-controls="speed-dial-menu-square"
          aria-expanded="false"
        >
          <svg
            className="mr-2 -ml-1 w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          Create your team now!
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
                                closeMenuOnSelect={true}
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
                        {formCheck ? (
                          <>
                            {formSent ? (
                              <button
                                disabled
                                type="button"
                                className="w-6/12 mt-2 p-2.5 flex-1 text-white bg-blue-700 rounded-md outline-none ring-offset-2 ring-blue-700 focus:ring-2 hover:bg-blue-800 focus:outline-none focus:ring-blue-300"
                              >
                                <svg
                                  aria-hidden="true"
                                  role="status"
                                  className="inline mr-3 w-4 h-4 text-white animate-spin"
                                  viewBox="0 0 100 101"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="#E5E7EB"
                                  />
                                  <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentColor"
                                  />
                                </svg>
                                Loading...
                              </button>
                            ) : (
                              <button
                                type="submit"
                                className="w-full mt-2 p-2.5 flex-1 text-white bg-blue-700 rounded-md outline-none ring-offset-2 ring-blue-700 focus:ring-2"
                                onClick={(e) => {
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
                                  );
                                  setFormSent(true);
                                  window.setTimeout(function () {
                                    location.reload();
                                  }, 3000);
                                }}
                              >
                                Create Team
                              </button>
                            )}
                          </>
                        ) : (
                          <button
                            className="w-6/12 mt-2 p-2.5 text-white bg-blue-400 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            disabled
                          >
                            Create Team
                          </button>
                        )}
                        <button
                          className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                          onClick={() => setShowModal(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                    <div className="items-center gap-2 mt-3 sm:flex">
                      {message}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
