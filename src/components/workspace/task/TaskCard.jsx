import Task from "./Task";
let socket;

export default function TaskCard({ task, listID, usernameProps, tag1, tag2 }) {
  return (
    <div className="relative w-full h-full flex flex-col items-start p-4 mt-3 bg-white rounded-lg bg-opacity-90 group hover:bg-opacity-100 border-b-2 border-gray-500 cursor-grab-md">
      <span className="flex items-center h-6 px-3 text-xs font-semibold text-pink-500 bg-pink-100 rounded-full">
        {task.name}
      </span>
      <h4 className="mt-3 text-sm font-medium break-all">{task.description}</h4>
      <div className="items-center w-full mt-3 text-xs font-medium text-gray-400 ">
        <div className="flex items-center pb-2">
          <svg
            className="w-4 h-4 text-blue-600 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clipRule="evenodd"
            />
          </svg>
          <span className="ml-1 leading-none text-blue-600 text-xs font-bold">
            Due: {task.deadline}
          </span>
        </div>
        <hr />
        <div className="flex justify-end items-center p-2 bg-gray-100 rounded-b-lg">
        <span class="t group relative flex justify-center rounded bg-blue-50 px-2 text-blue-700">
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
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              {task.username.length}
              <span class="absolute right-full top-1/2 ml-4 -translate-y-1/2 rounded bg-white px-3 py-1 text-xs font-medium text-black opacity-0 group-hover:opacity-100 border-2 border-black">
                <ul className="text-xs list-disc pl-2">
                  {task.username.map((username) => (
                    <li key={username} className="">
                      {username}
                    </li>
                  ))}
                </ul>
              </span>
            </span>
        </div>
      </div>
      <Task
        task={task}
        listID={listID}
        usernameProps={usernameProps}
        tag1={tag1}
        tag2={tag2}
      />
    </div>
  );
}
