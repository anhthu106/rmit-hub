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
  courseProps
}) {
  const [message, setMessage] = useState(null);

  if (sessionName === username) {
    return (
      <>
        <Post
          tag={
            <>
              <DeleteButton
                author={author}
                course={course}
                content={content}
                date={date}
                setMessage={setMessage}
                id={id}
                image={image}
              />
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
        {/* TODO fix edit post section */}
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

function DeleteButton({ author, date, content, course, setMessage, id, image }) {
  return (
    <>
      <div className="flex justify-between items-center">
        <span>{/* place holder (dont delete) */}</span>
        <button
          type="button"
          className="inline-flex items-center text-slate-700  bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
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
            className="w-5 h-5 mr-1.5 -ml-1"
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
          Delete Post
        </button>
      </div>
    </>
  );
}
