import makeAnimated from "react-select/animated";
import {useState} from "react";
import Select from "react-select";
import {util} from "../../../utils/utils";
import {io} from "socket.io-client";
import EditList from "../list/EditList";

let socket;

export default function CreateTask({listID, usernameProps, listName}) {
    const animated = makeAnimated();
    const personOption = util.username(usernameProps);

    const [description, setDescription] = useState();
    const [deadline, setDeadline] = useState();
    const [assignedPerson, setAssignedPerson] = useState();
    const [message, setMessage] = useState(null);
    const [showModal, setShowModal] = useState(false);

    return (
        <div>
            {/* <div data-dial-init className="w-full group z-50">
        <button
          type="button"
          onClick={() => setShowModal(true)}
          data-dial-toggle="speed-dial-menu-square"
          aria-controls="speed-dial-menu-square"
          aria-expanded="false"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 w-full"
        >
          Add task...
        </button>
      </div> */}

            <div
                className="flex items-center flex-shrink-0 h-10 py-8 px-4 border-solid border-2 border-white rounded-lg">
                <EditList
                    className="block text-lg font-semibold"
                    listId={listID}
                    listTile={listName}
                />

                {/*<span>{listName}</span>*/}
                {/* <span className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">
          2
        </span> */}
                <button
                    className="flex items-center justify-center w-6 h-6 ml-auto text-indigo-500 rounded hover:bg-indigo-700 hover:text-indigo-100"
                    onClick={() => setShowModal(true)}
                >
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        ></path>
                    </svg>
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
                                            Add a task
                                        </h1>
                                        <form className="w-full pb-6 space-y-4 md:space-y-6 sm:pb-8 pt-8">
                                            <div className="mb-4 border border-gray-200 rounded-lg bg-gray-50">
                                                <div className="px-4 py-2 bg-white rounded-t-lg">
                                                    <div className="pb-4 md:pb-6 space-y-5">
                                                        <div>
                                                            <label
                                                                htmlFor="description"
                                                                className="block mb-2 text-2xl font-medium text-gray-900 "
                                                            >
                                                                Description
                                                            </label>
                                                            <input
                                                                placeholder="Enter list description..."
                                                                type="text"
                                                                id="description"
                                                                name="description"
                                                                required
                                                                value={description}
                                                                onChange={(e) => setDescription(e.target.value)}
                                                                className="w-full text-lg text-gray-900 bg-white focus:ring-1 resize-none rounded-md border border-gray-300"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label
                                                                htmlFor="deadline"
                                                                className="block mb-2 text-2xl font-medium text-gray-900 "
                                                            >
                                                                Deadline
                                                            </label>
                                                            <input
                                                                type="date"
                                                                id="deadline"
                                                                name="deadline"
                                                                required
                                                                value={deadline}
                                                                onChange={(e) => setDeadline(e.target.value)}
                                                                className="w-full text-lg text-gray-900 bg-white focus:ring-1 resize-none rounded-md border border-gray-300"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label
                                                                htmlFor="assignedPerson"
                                                                className="block mb-2 text-2xl font-medium text-gray-900 "
                                                            >
                                                                Person In Charge
                                                            </label>
                                                            <Select
                                                                onChange={(assignedPerson) =>
                                                                    setAssignedPerson(assignedPerson.label)
                                                                }
                                                                components={animated}
                                                                options={personOption}
                                                                placeholder={assignedPerson}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="items-center gap-2 mt-3 sm:flex">
                                                <button
                                                    type="submit"
                                                    className="w-full mt-2 p-2.5 flex-1 text-white bg-blue-700 rounded-md outline-none ring-offset-2 ring-blue-700 focus:ring-2"
                                                    onClick={(e) => {
                                                        const data = {
                                                            description,
                                                            listID,
                                                            deadline,
                                                            assignedPerson,
                                                        };

                                                        socket = io();
                                                        socket.emit("updateTask", data);
                                                        e.preventDefault();
                                                        setShowModal(false)
                                                    }}
                                                >
                                                    Add Task
                                                </button>
                                                <button
                                                    className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                                                    onClick={() => setShowModal(false)}
                                                >
                                                    Cancel
                                                </button>
                                            </div>

                                            <hr/>
                                        </form>

                                        <div className="items-center gap-2 mt-3 sm:flex"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}

            {/* <form>
        <div>
          <label htmlFor="description">Description</label>
          <input
            placeholder="Enter list description..."
            type="text"
            id="description"
            name="description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="deadline">Deadline</label>
          <input
            placeholder="Enter deadline..."
            type="text"
            id="deadline"
            name="deadline"
            required
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="assignedPerson">Person In Charge</label>
          <Select
            onChange={(assignedPerson) =>
              setAssignedPerson(assignedPerson.label)
            }
            components={animated}
            options={personOption}
            placeholder={assignedPerson}
          />
        </div>
        <button
          onClick={(e) => {
            const data = { description, listID, deadline, assignedPerson };

            socket = io();
            socket.emit("updateTask", data);
            e.preventDefault();
          }}
        >
          Add Task
        </button>
        <hr />
      </form> */}
            <div>{message}</div>
        </div>
    );
}
