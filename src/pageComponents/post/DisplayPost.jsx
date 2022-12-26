import { useState } from "react";
import { deleteItems } from "../../backend/helper/items/items";
import dynamic from "next/dynamic";
import { Button } from "../../components/button/Button";

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
  teamID,
}) {
  const [message, setMessage] = useState(null);


  if (sessionName === username) {
    console.log(message);
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
              <div className="flex flex-col border-2 border-gray-500 p-4 bg-white min-w-[10rem] h-max rounded-md z-20 absolute right-0 invisible tooltip-item border-solid">
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

function DeleteButton({ author, date, content, course, id, image }) {
    const [buttonClicked, setButtonClicked] = useState(false);
  return (
    <>
      <li>
        {buttonClicked ? (
          <button
            disabled
            type="button"
            className="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 "
          >
            <svg
              aria-hidden="true"
              role="status"
              className="inline mr-3 w-6 h-6 animate-spin text-gray-400 transition duration-75 group-hover:text-gray-900"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>
            <span className="flex-1 text-left whitespace-nowrap">
              Deleting...
            </span>
          </button>
        ) : (
          <Button
            type="button"
            style="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 "
            fn={(e) => {
                setButtonClicked(true);
              deleteItems(
                { author, date, content, course, image },
                e,
                `/api/posts/${id}`
              );
            //   window.setTimeout(function () {
            //     location.reload();
            //   }, 2000);
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
        )}
      </li>
    </>
  );
}
