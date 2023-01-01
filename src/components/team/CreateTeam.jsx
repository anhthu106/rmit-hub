import makeAnimated from "react-select/animated";
import { useState } from "react";
import Select from "react-select";
import { util } from "../../utils/utils";
import { addItems } from "../../backend/helper/items/items";
import { useEffect } from "react";
import { Button, DisabledButton, ButtonWithLoading } from "../button/Button";

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
        <Button
          type="button"
          style="text-white bg-blue-700 hover:bg-blue-700/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center my-5"
          fn={() => setShowModal(true)}
          options={
            <>
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
            </>
          }
        />
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
                              <ButtonWithLoading />
                            ) : (
                              <Button
                                type="submit"
                                style="w-6/12 mt-2 p-2.5 text-white bg-blue-700 font-medium rounded-md text-sm px-5 py-2.5 text-center flex-1 outline-none ring-offset-2 ring-blue-700 focus:ring-2"
                                fn={(e) => {
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
                                options={"Create Team"}
                              />
                            )}
                          </>
                        ) : (
                          <DisabledButton
                            type="button"
                            style="w-6/12 mt-2 p-2.5 text-white bg-blue-400 font-medium rounded-md text-sm px-5 py-2.5 text-center flex-1 outline-none ring-offset-2 ring-blue-700 focus:ring-2"
                            options={"Create Team"}
                          />
                        )}
                        <Button
                          type="button"
                          style="w-6/12 mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-gray-600 focus:ring-2 font-medium text-sm px-5 py-2.5 text-center outline-none" 
                          fn={() => setShowModal(false)}
                          options={"Cancel"}
                        />
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
