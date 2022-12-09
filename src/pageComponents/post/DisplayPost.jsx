import { useState } from "react";
import { deleteItems } from "../../backend/helper/items/items";
import EditPost from "../../components/posts/EditPost";
import Post from "../../components/posts/Post";

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
}) {
  const [message, setMessage] = useState(null);

  if (sessionName === username) {
    return (
      <>
        <Post
          tag={
            <>
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
                  course={course}
                  content={content}
                  uid={uid}
                  id={id}
                  courseProps={courseProps}
                />
              </ul>
            </>
          }
          content={content}
          date={date}
          author={author}
          course={course}
          uid={uid}
          image={image}
          avatar={avatar}
        />
        {/* <EditPost
          preCourse={course}
          preContent={content}
          uid={uid}
          id={id}
          courseProps={courseProps}
        /> */}
      </>
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
    />
  );
}

function DeleteButton({
  author,
  date,
  content,
  course,
  setMessage,
  id,
  image,
}) {
  return (
    <>
      <li>
        <button
          type="button"
          className="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
          onClick={(e) => {
            deleteItems(
              { author, date, content, course, image },
              e,
              setMessage,
              `/api/posts/${id}`
            );
            window.location.reload(false);
          }}
        >
          <svg
            className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
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
        </button>
      </li>
    </>
  );
}
