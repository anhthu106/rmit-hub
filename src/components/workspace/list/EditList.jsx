import { useEffect, useState } from "react";
import { io } from "socket.io-client";

let socket;

export default function EditList({ listTile, listId }) {
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
    <div className="text-lg font-semibold pr-8">
      <form>
        <div>
          <input
            // className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2.5"
            className="bg-transparent border-0 border-gray-300 text-gray-900 text-base font-medium rounded-lg focus:ring-blue-900 focus:border-blue-ring-blue-900 w-full p-2.5 focus:bg-gray-50"
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={onKeyDown}
          />
        </div>
      </form>
    </div>
  );
}
