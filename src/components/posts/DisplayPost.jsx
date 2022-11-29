import {useState} from "react";
import {deleteItems} from "../../backend/helper/items/items";

export default function DisplayPost({
                                        author,
                                        date,
                                        content,
                                        course,
                                        id,
                                        sessionName,
                                        username,
                                    }) {
    const [message, setMessage] = useState(null);
    if (sessionName === username) {
        return (
            <>
                <div className="flex items-center justify-center">
                    <div className="rounded-xl border p-5 shadow-md w-full bg-white">
                        <div className="flex w-full items-center justify-between border-b pb-3">
                            <div className="flex items-center space-x-3">
                                <div
                                    className="h-8 w-8 rounded-full bg-slate-400 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-300 via-indigo-400 to-indigo-500"></div>
                                <div className="text-lg font-bold text-slate-700">{author}</div>


                            </div>
                            <div className="flex items-center space-x-8">
                                {/* <button className="rounded-2xl border bg-neutral-100 px-3 py-1 text-xs font-semibold">
                Category
              </button> */}
                                <div className="text-xs text-neutral-500">{date}</div>
                            </div>
                        </div>
                        <ReturnPost course={course} content={content}/>
                        <div>
                            <div className="flex items-center justify-between text-slate-500">
                                <div className="flex space-x-4 md:space-x-8">
                                    <div className="flex cursor-pointer items-center transition hover:text-slate-600">
                    <span>
                      LOL something goes here
                      
                      <DeleteButton
                          author={author}
                          course={course}
                          content={content}
                          date={date}
                          setMessage={setMessage}
                          id={id}
                      />
                    </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
    return (
        <>
            <div className="flex items-center justify-center">
                <div className="rounded-xl border p-5 shadow-md w-full bg-white">
                    <div className="flex w-full items-center justify-between border-b pb-3">
                        <div className="flex items-center space-x-3">
                            <div
                                className="h-8 w-8 rounded-full bg-slate-400 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-300 via-indigo-400 to-indigo-500"></div>
                            <div className="text-lg font-bold text-slate-700">{author}</div>
                        </div>
                        <div className="flex items-center space-x-8">
                            {/* <button className="rounded-2xl border bg-neutral-100 px-3 py-1 text-xs font-semibold">
                Category
              </button> */}
                            <div className="text-xs text-neutral-500">{date}</div>
                        </div>
                    </div>
                    <ReturnPost course={course} content={content}/>
                    <div>
                        <div className="flex items-center justify-between text-slate-500">
                            <div className="flex space-x-4 md:space-x-8">
                                <div className="flex cursor-pointer items-center transition hover:text-slate-600">
                  <span>
                    LOL something goes here

                  </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

function DeleteButton({author, date, content, course, setMessage, id}) {
    return (
        <>
            <div className="flex justify-between items-center">
                <span>{/* place holder (dont delete) */}</span>
                <button
                    type="button"
                    className="inline-flex items-center text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    onClick={(e) =>
                        deleteItems(
                            {author, date, content, course},
                            e,
                            setMessage,
                            `/api/posts/${id}`
                        )
                    }
                >
                    <svg
                        aria-hidden="true"
                        className="w-5 h-5 mr-1.5 -ml-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                    Delete Post
                </button>
            </div>
        </>
    );
}

function ReturnPost(props) {
    return (
        <>
            <div className="mt-4 mb-6">
                <div className="mb-3 text-xl font-bold">Course</div>
                <div className="text-sm text-neutral-600">{props.course}</div>
            </div>
            <hr/>
            <div className="mt-4 mb-6">
                <div className="text-sm text-neutral-600">{props.content}</div>
            </div>
        </>
    );
}
