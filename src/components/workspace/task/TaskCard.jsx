import { io } from "socket.io-client";
import Hamburger from "../../hamburger/Hamburger";
import DropDownHamburger from "../../hamburger/DropDown.Hamburger";
import Task from "./Task";

let socket;
export default function TaskCard({ task, listID, usernameProps, tag1, tag2 }) {
  return (
    <div className="relative w-full h-full flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100 border-b-2 border-blue-500">
      {/* <div className="absolute top-0 right-0 flex w-5 h-5 mt-5 mr-5 tooltip">
        <Hamburger />
        <div className="flex flex-col p-4 bg-white w-max h-max rounded-md z-20 absolute right-0 invisible tooltip-item border-solid">
          <DropDownHamburger
            tag={
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            }
            buttonFnc={(e) => {
              const data = task._id;

              socket = io();
              socket.emit("deleteTask", data);
              e.preventDefault();
            }}
            nameTag={"Delete Task"}
          />
        </div>
      </div> */}
      <span className="flex items-center h-6 px-3 text-xs font-semibold text-pink-500 bg-pink-100 rounded-full">
        Design
      </span>
      <h4 className="mt-3 text-sm font-medium">{task.description}</h4>
      <div className="flex items-center w-full mt-3 text-xs font-medium text-gray-400">
        <div className="flex items-center">
          <svg
            className="w-4 h-4 text-gray-300 fill-current"
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
          <span className="ml-1 leading-none">{task.deadline}</span>
        </div>
        <div className="w-6 h-6 ml-auto rounded-full">LOL</div>
      </div>
      <Task
        task={task}
        listID={listID._id}
        usernameProps={usernameProps}
        tag1={tag1}
        tag2={tag2}
      />
    </div>
    
  );
}
