import { useState } from "react";
import { io } from "socket.io-client";

let socket;
export default function CreateList({ teamID }) {
  const [title, setTitle] = useState();
  const [message, setMessage] = useState(null);

  return (
    <div>
      <form>
        <div>
          <label
            htmlFor="title"
            class="block mb-2 text-sm font-medium text-gray-900"
          >
            Title
          </label>
          <input
            placeholder="Enter list title..."
            type="text"
            id="title"
            name="title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
          onClick={(e) => {
            const data = { title, teamID };

            socket = io();
            socket.emit("updateList", data);

            e.preventDefault();
          }}
        >
          Add List
        </button>
      </form>
      <div>{message}</div>
    </div>
  );
}
