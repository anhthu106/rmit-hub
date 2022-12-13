import makeAnimated from "react-select/animated";
import { util } from "../../../utils/utils";
import { useEffect, useState } from "react";
import Select from "react-select";
import { io } from "socket.io-client";
import TaskCard from "./TaskCard";

let socket;

export default function Task({ listID, usernameProps, task, tag1, tag2,tag3 }) {
  const animated = makeAnimated();
  const personOption = util.username(usernameProps);

  const [description, setDescription] = useState(task.description);
  const [deadline, setDeadline] = useState(task.deadline);
  const [assignedPerson, setAssignedPerson] = useState(task.username);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    setDescription(task.description);
    setDeadline(task.deadline);
    setAssignedPerson(task.username);
  }, [task.description, task.deadline, task.username]);

  const onKeyDown = (e) => {
    if (e.key === "Enter" || e.key === "Escape") {
      const data = {
        task,
        description,
        listID,
        deadline,
        assignedPerson,
      };

      socket = io();
      socket.emit("updateTask", data);
      e.preventDefault();
      // setShowModal(false);
    }
  };

  return (
    // TODO modal
    <>
      <div className="inline-flex justify-center items-center rounded-md w-full">
        <span onClick={() => setShowModal(true)} className="w-6/12">
          {tag1}
        </span>

        {/* TODO fix pop up */}
        {tag2}
      </div>
      <span onClick={() => setShowModal(true)}>
        {tag3}
      </span>
      

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
                    <div className="flex items-center justify-between mt-3 mb-2 sm:px-auto">
                      <div className="flex py-1  leading-tight tracking-tight text-gray-900 font-semibold text-sm md:text-base rounded cursor-default	">
                        <svg
                          className="w-6 h-6 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                          />
                        </svg>
                        Insert Name
                      </div>
                    </div>
                    <form
                    // className="hidden"
                    >
                      <div>
                        <label
                          htmlFor="description"
                          // className="block mb-2 text-2xl font-medium text-gray-900 "
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
                          onKeyDown={onKeyDown}
                          onChange={(e) => setDescription(e.target.value)}
                          // className="w-full text-lg text-gray-900 bg-white focus:ring-1 resize-none rounded-md border border-gray-300"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="deadline"
                          // className="block mb-2 text-2xl font-medium text-gray-900 "
                        >
                          Deadline
                        </label>
                        <input
                          type="date"
                          id="deadline"
                          name="deadline"
                          required
                          value={deadline}
                          onKeyDown={onKeyDown}
                          onChange={(e) => setDeadline(e.target.value)}
                          // className="w-full text-lg text-gray-900 bg-white focus:ring-1 resize-none rounded-md border border-gray-300"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="assignedPerson"
                          // className="block mb-2 text-2xl font-medium text-gray-900 "
                        >
                          Person In Charge
                        </label>
                        <Select
                          onChange={(assignedPerson) =>
                            setAssignedPerson(assignedPerson.label)
                          }
                          components={animated}
                          options={personOption}
                          onKeyDown={onKeyDown}
                          placeholder={assignedPerson}
                        />
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
    </>
  );
}
