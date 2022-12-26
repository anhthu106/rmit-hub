import {useState} from "react";
import {deleteItems} from "../../backend/helper/items/items";
import dynamic from "next/dynamic";
import {Button,} from "../../components/button/Button";

const EditPost = dynamic(() => import("../../components/posts/EditPost"));
const Post = dynamic(() => import("../../components/posts/Post"));

export default function DisplayPost({
                                        author,
                                        date,
                                        content,
                                        course,
                                        id,
                                        sessionName,
                                        username,
                                        uid,
                                        image,
                                        avatar,
                                        courseProps,
                                        teamID
                                    }) {
    const [message, setMessage] = useState(null);

    if (sessionName === username) {
        return (
            <Post
                tag={
                    <>
                        <div className="relative inline-block tooltip ">
                            <div to="" className="hover:text-gray-400 px-2 py-1 font-medium ">
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                                    />
                                </svg>
                            </div>
                            <div
                                className="flex flex-col border-2 border-gray-500 p-4 bg-white w-max h-max rounded-md z-20 absolute right-0 invisible tooltip-item border-solid">
                                <ul className="space-y-2">
                                    <DeleteButton
                                        author={author}
                                        course={course}
                                        content={content}
                                        date={date}
                                        setMessage={setMessage}
                                        id={id}
                                        image={image}
                                    />
                                    <EditPost
                                        preCourse={course}
                                        preContent={content}
                                        uid={uid}
                                        id={id}
                                        courseProps={courseProps}
                                    />
                                </ul>
                            </div>
                        </div>
                    </>
                }
                content={content}
                date={date}
                author={author}
                course={course}
                uid={uid}
                image={image}
                avatar={avatar}
                TeamID={teamID}
            />
        );
    }
    return (
        <Post
            tag={<></>}
            content={content}
            date={date}
            author={author}
            course={course}
            uid={uid}
            image={image}
            avatar={avatar}
            TeamID={teamID}
        />
    );
}

function DeleteButton({author, date, content, course, id, image}) {
    return (
        <>
            <li>
                <Button
                    type="button"
                    style="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 "
                    fn={(e) => {
                        deleteItems(
                            {author, date, content, course, image},
                            e,
                            `/api/posts/${id}`
                        );
                        window.setTimeout(function () {
                            location.reload();
                        }, 2000);
                    }}
                    options={
                        <>
                            <svg
                                className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-900"
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
                            <span className="flex-1 ml-3 text-left whitespace-nowrap">
                Delete Post
              </span>
                        </>
                    }
                />
            </li>
        </>
    );
}
