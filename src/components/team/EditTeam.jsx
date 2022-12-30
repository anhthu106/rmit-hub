import makeAnimated from "react-select/animated";
import { useState, useEffect } from "react";
import { updateItems } from "../../backend/helper/items/items";
import { Button } from "../button/Button";

export default function EditTeam({ preName, preDescription, id }) {
  const animated = makeAnimated();

  const [newName, setName] = useState(preName);
  const [newDescription, setDescription] = useState(preDescription);

  const [message, setMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);


  function reloadHandler() {
    if (message !== null) {
      window.setTimeout(function () {
        location.reload();
      }, 300);
    }
  }

  useEffect(() => {
    reloadHandler();
});

  return (
    <div>
      <div className="md:grid md:grid-cols-2-2 inline-flex justify-center items-center rounded-md w-full">
        <Button
          type="button"
          style="md:w-full md:rounded-lg text-white bg-blue-700 outline-none ring-offset-2 ring-blue-700 focus:ring-2 text-sm hover:bg-blue-800 border rounded-l-lg font-medium w-6/12  px-4 py-2 inline-flex space-x-1 items-center justify-center"
          fn={() => setShowModal(true)}
          options={
            <>
              <span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </span>
              <span>Edit</span>
            </>
          }
        />
        <Button
          type={"button"}
          style="md:w-full md:rounded-lg text-white bg-red-600 outline-none ring-offset-2 ring-red-600 focus:ring-2 text-sm  hover:bg-red-700 border rounded-r-lg font-medium w-6/12  px-4 py-2 inline-flex space-x-1 items-center justify-center"
          fn={(e) => {
            deleteItems(null, e, setMessage, `../../api/team/${team.id}`);
            window.setTimeout(function () {
              location.replace("../../");
            }, 1000);
          }}
          options={
            <>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </span>
              <span>Delete</span>
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
            <div className="flex items-center min-h-screen sm:px-4 py-8">
              <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                <div className="mt-3 ">
                  <div className="mt-2 text-center sm:ml-4 sm:text-left">
                    <h1 className="text-xl font-medium leading-tight tracking-tight text-gray-900 md:text-3xl text-center">
                      Edit Team Infomation
                    </h1>
                    <form className="w-full pb-6 space-y-4 md:space-y-6 sm:pb-8 pt-8">
                      <div className="mb-4 border border-gray-200 rounded-lg bg-gray-50">
                        <div className="px-4 py-2 bg-white rounded-t-lg">
                          <div className="pb-4 md:pb-6">
                            <label
                              htmlFor="newName"
                              className="font-semibold leading-none block mb-2 text-2xl text-gray-900 "
                            >
                              Team name
                            </label>
                            <input
                              className="w-full text-lg text-gray-900 bg-white focus:ring-1 resize-none rounded-md border border-gray-300"
                              required
                              type="text"
                              id="newName"
                              name="newName"
                              value={newName}
                              placeholder={preName}
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>
                          <div className="pb-4 md:pb-6">
                            <label
                              htmlFor="newDescription"
                              className="font-semibold leading-none block mb-2 text-2xl text-gray-900 "
                            >
                              Description
                            </label>
                            <textarea
                              className="w-full text-lg text-gray-900 bg-white focus:ring-1 resize-none rounded-md border border-gray-300"
                              type="text"
                              rows="2"
                              required
                              id="newDescription"
                              name="newDescription"
                              value={newDescription}
                              onChange={(e) => setDescription(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="items-center gap-2 mt-3 flex">
                        <Button
                          type="button"
                          style="w-full mt-2 p-2.5 flex-1 text-white bg-blue-700 rounded-md outline-none ring-offset-2 ring-blue-700 focus:ring-2"
                          fn={(e) =>
                            updateItems(
                              {
                                newName,
                                newDescription,
                              },
                              e,
                              setMessage,
                              `/api/team/${id}`
                            )
                          }
                          options={"Update Team"}
                        />
                        <Button
                          type=""
                          style="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                          fn={() => setShowModal(false)}
                          options={"Cancel"}
                        />
                      </div>
                    </form>
                    <p className="text-lg text-green-600 text-center">
                      {message}
                    </p>
                    <div className="items-center gap-2 mt-3 sm:flex"></div>
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
