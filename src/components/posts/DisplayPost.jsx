import { useState } from "react";
import { deleteItems } from "../../backend/helper/items/items";

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
        <div className="">
          <div className="py-8 space-y-4 md:space-y-6 ">
            <div className="relative p-4 bg-white rounded-lg shadow sm:p-5 border border-gray-200">
              <div className="flex justify-between mb-4 rounded-t sm:mb-5">
                <div className="text-gray-900">
                  <h3 className="text-lg md:text-xl font-semibold ">
                    {author}
                  </h3>
                  <em className="text-xs md:text-sm font-em">{date}</em>
                </div>
                <div></div>
              </div>
              <ReturnPost
                author={author}
                course={course}
                content={content}
                date={date}
              />

              <DeleteButton
                author={author}
                course={course}
                content={content}
                date={date}
                setMessage={setMessage}
                id={id}
              />
            </div>
          </div>
          <span></span>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="">
        <div className="py-8 space-y-4 md:space-y-6 ">
          <div className="relative p-4 bg-white rounded-lg shadow sm:p-5 border border-gray-200">
            <div className="flex justify-between mb-4 rounded-t sm:mb-5">
              <div className="text-gray-900">
                <h3 className="text-lg md:text-xl font-semibold ">{author}</h3>
                <em className="text-xs md:text-sm font-em">{date}</em>
              </div>
              <div></div>
            </div>
            <ReturnPost
              author={author}
              course={course}
              content={content}
              date={date}
            />
          </div>
        </div>
        <span></span>
      </div>
    </>
  );
}

function DeleteButton({ author, date, content, course, setMessage, id }) {
  return (
    <>
      <div className="flex justify-between items-center">
        <span>{/* place holder (dont delete) */}</span>
        <button
          type="button"
          className="inline-flex items-center text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          onClick={(e) =>
            deleteItems(
              { author, date, content, course },
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
    <dl>
      <dt className="mb-2 font-semibold leading-none text-gray-900 ">Course</dt>
      <dd className="mb-4 font-light text-gray-500 sm:mb-5 ">{props.course}</dd>
      <dt className="mb-2 font-semibold leading-none text-gray-900 ">
        Content
      </dt>
      <dd className="mb-4 font-light text-gray-500 sm:mb-5 ">
        {props.content}
      </dd>
    </dl>
  );
}
