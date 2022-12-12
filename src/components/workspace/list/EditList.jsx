import { useEffect, useState } from "react";
import { io } from "socket.io-client";

let socket;

export default function EditList({ listTile, listId }) {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState(listTile);

  useEffect(() => {
    setTitle(listTile);
  }, [listTile]);

  const onKeyDown = (e) => {
    if (e.key === "Enter" || e.key === "Escape") {
      const data = { title, listId };

      socket = io();
      socket.emit("editList", data);

      e.preventDefault();
    }
  };
  return (
    <div>
      <div>
        <button
          type="button"
          className="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
          onClick={() => setShowModal(true)}
        >
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
          <span className="flex-1 ml-3 text-left whitespace-nowrap">
            Edit List
          </span>
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
                      Edit List
                    </h1>
                    <form className="w-full pb-6 space-y-4 md:space-y-6 sm:pb-8 pt-8">
                      <div className="mb-4 border border-gray-200 rounded-lg bg-gray-50">
                        <div className="px-4 py-2 bg-white rounded-t-lg">
                          <div className="pb-4 md:pb-6 space-y-5">
                            <div>
                              <label htmlFor="title">Title</label>
                              <input
                                placeholder={listTile}
                                type="text"
                                id="title"
                                name="title"
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                onKeyDown={onKeyDown}
                                className="w-full text-lg text-gray-900 bg-white focus:ring-1 resize-none rounded-md border border-gray-300"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="items-center gap-2 mt-3 sm:flex">
                        <button
                          className="w-full mt-2 p-2.5 flex-1 text-white bg-blue-700 rounded-md outline-none ring-offset-2 ring-blue-700 focus:ring-2"
                          onClick={(e) => {
                            const data = { title, listId };

                            socket = io();
                            socket.emit("editList", data);

                            e.preventDefault();
                            setShowModal(false);
                          }}
                        >
                          Edit List
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
    </div>
  );
}
