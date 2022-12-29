import {useRef, useState} from "react";
import {io} from "socket.io-client";
import {Button} from "../../button/Button";

let socket;
export default function CreateList({teamID}) {
    const [title, setTitle] = useState("");
    const input = useRef(null);

    function submit(e) {
        const data = {title, teamID};

        socket = io();
        socket.emit("updateList", data);

        e.preventDefault();
        setTitle("");
        handleClick();
    }

    const onKeyDown = (e) => {
        if (e.key === "Enter" || e.key === "Escape") {
            submit(e);
        }
    };

    const handleClick = () => {
        input.current.focus();
    };

    return (
        <div>
            <form className="bg-gray-50 w-fit p-3 rounded-lg">
                <div>
                    <label
                        htmlFor="title"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        New Title
                    </label>
                    <input
                        ref={input}
                        autoFocus
                        placeholder="Enter list title..."
                        type="text"
                        id="title"
                        name="title"
                        required
                        value={title}
                        onKeyDown={onKeyDown}
                        onChange={(e) => setTitle(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                </div>

                <Button
                    type="button"
                    style="text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-lg font-medium w-full mt-3 px-4 py-2 inline-flex space-x-1 items-center justify-center"
                    fn={(e) => {
                        submit(e)
                    }}
                    options={
                        <>
                            {" "}
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
                      d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </span>
                            <span>Add List</span>
                        </>
                    }
                />
            </form>
        </div>
    );
}
