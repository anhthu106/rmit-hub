import makeAnimated from "react-select/animated";
import { util } from "../../../utils/utils";
import { useEffect, useState } from "react";
import Select from "react-select";
import { io } from "socket.io-client";
import Button from "../../button/Button";

let socket;

export default function Task({
  listID,
  usernameProps,
  task,
  tag1,
  tag2,
  tag3,
}) {
  const animated = makeAnimated();
  const personOption = util.username(usernameProps);

  const [name, setName] = useState(task.name);
  const [description, setDescription] = useState(task.description);
  const [deadline, setDeadline] = useState(task.deadline);
  const [assignedPerson, setAssignedPerson] = useState(task.username);
  const [showModal, setShowModal] = useState(false);
  const [dateIsOK, setDateIsOK] = useState(false);

  useEffect(() => {
    setName(task.name);
    setDescription(task.description);
    setDeadline(task.deadline);
    setAssignedPerson(task.username);
  }, [task.name, task.description, task.deadline, task.username]);

  const onKeyDown = (e) => {
    if (e.key === "Enter" || e.key === "Escape") {
      const data = {
        task,
        name,
        description,
        listID,
        deadline,
        assignedPerson,
      };

      socket = io();
      socket.emit("updateTask", data);
      e.preventDefault();
      setAssignedPerson("");
      setDeadline("");
      setName("");
      setDescription("");
      // setShowModal(false);
    }
  };
  function conpareString(pick) {
    let current = new Date();
    let date = `${current.getFullYear()}-${
      current.getMonth() + 1
    }-${current.getDate()}`;
    let text1 = date.toString();
    let text2 = pick.toString();
    let result = text2.localeCompare(text1);
    if (result === 1) {
      setDateIsOK(false);
    } else {
      setDateIsOK(true);
      setDeadline(date);
    }
  }
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
      <span onClick={() => setShowModal(true)}>{tag3}</span>

      {showModal ? (
        <>
          <div className="fixed inset-0 z-10 overflow-y-auto cursor-pointer">
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40"
              onClick={() => setShowModal(false)}
            ></div>

            {/* TODO Date check alert */}
            {dateIsOK ? (
              <div className="absolute top-0 flex items-center min-h-screen cursor-auto">
                <div
                  className="absolute top-0 w-screen flex p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
                  role="alert"
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 inline w-5 h-5 mr-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Info</span>
                  <div>
                    <span className="font-medium">Danger alert!</span> Make sure
                    the deadline date is a date after today!
                  </div>
                </div>
              </div>
            ) : null}

            <div className="flex items-center min-h-screen md:px-40 px-4 py-16 cursor-auto">
              <div className="relative max-h-screen w-screen md:w-2/3 p-4 mx-auto bg-white rounded-md shadow-lg">
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
                      {name}
                    </div>
                    <div className="absolute top-0 right-0 flex w-5 h-5 mt-5 mr-5 tooltip ">
                      <button
                        className="hover:text-gray-400 font-medium"
                        onClick={() => setShowModal(false)}
                      >
                        <svg
                          className="w-4 h-4 fill-current"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <form className="px-8">
                    <div className="mb-6">
                      <label
                        htmlFor="name"
                        className="block mb-2 text-2xl font-medium text-gray-900 "
                      >
                        Name
                      </label>
                      <input
                        autoComplete="off"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Enter name name..."
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={name}
                        onKeyDown={onKeyDown}
                        onChange={(e) => setName(e.target.value)}
                        // className="w-full text-lg text-gray-900 bg-white focus:ring-1 resize-none rounded-md border border-gray-300"
                      />
                    </div>
                    <div className="mb-6">
                      <label
                        htmlFor="description"
                        className="block mb-2 text-2xl font-medium text-gray-900 "
                      >
                        Description
                      </label>
                      <input
                        autoComplete="off"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
                    <div className="mb-6">
                      <label
                        htmlFor="deadline"
                        className="block mb-2 text-2xl font-medium text-gray-900 "
                      >
                        Deadline
                      </label>
                      <input
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        type="date"
                        id="deadline"
                        name="deadline"
                        required
                        value={deadline}
                        onKeyDown={onKeyDown}
                        onChange={(e) => {
                          setDeadline(e.target.value);
                          conpareString(e.target.value);
                        }}
                        // className="w-full text-lg text-gray-900 bg-white focus:ring-1 resize-none rounded-md border border-gray-300"
                      />
                    </div>
                    <div className="mb-6">
                      <label
                        htmlFor="assignedPerson"
                        className="block mb-2 text-2xl font-medium text-gray-900 "
                      >
                        Person In Charge
                      </label>
                      <Select
                        closeMenuOnSelect={false}
                        // isMulti
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        onChange={(assignedPerson) =>
                          setAssignedPerson(assignedPerson.label)
                        }
                        // defaultValue={assignedPerson}
                        components={animated}
                        options={personOption}
                        onKeyDown={onKeyDown}
                        placeholder={assignedPerson}
                      />
                    </div>
                    <Button
                      style="w-full px-8 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-white text-center"
                      fn={(e) => {
                        const data = {
                          task,
                          name,
                          description,
                          listID,
                          deadline,
                          assignedPerson,
                        };

                        socket = io();
                        socket.emit("updateTask", data);
                        e.preventDefault();
                        // setShowModal(false);
                        setAssignedPerson("");
                        setDeadline("");
                        setName("");
                        setDescription("");
                      }}
                      options={"Update?"}
                    />
                  </form>

                  <div className="items-center gap-2 mt-3 sm:flex"></div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
