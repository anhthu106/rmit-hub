import { Dropdown } from "flowbite-react";
import Link from "next/link";

export default function Post({ author, date, content, course, tag, uid }) {
  return (
    <>
      {/* <div className="flex flex-wrap place-items-center h-screen">
        <div className="overflow-hidden shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-5 hover:shadow-2xl rounded-lg h-90 w-6/12 cursor-pointer m-auto">
          <a href="#" className="w-full block h-full">
            <div className="bg-white w-full p-4">
              <p className="text-indigo-500 text-2xl font-medium">Title??</p>
              <p className="text-gray-800 text-sm font-medium mb-2">
                Something goes here
              </p>
              <p className="text-gray-600 font-light text-md">
                {content}
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Molestias delectus asperiores corrupti voluptate atque libero
                optio deserunt, enim neque. Asperiores rerum accusamus
                necessitatibus doloremque. Soluta laboriosam vitae dolores saepe
                corporis dignissimos ratione tempora placeat, odit cum incidunt
                architecto quas repellat voluptatum quisquam autem dicta enim
                qui facere deserunt eaque accusantium?
              </p>
              <div className="flex flex-wrap justify-starts items-center py-3 border-b-2 text-xs text-white font-medium">
                <span className="m-1 px-2 py-1 rounded bg-indigo-500">
                  {course}
                </span>
              </div>
              <div className="flex items-center mt-2">
                LOL
                <div className="pl-3">
                  <div className="font-medium">{author}</div>
                  <div className="text-gray-600 text-sm">{date}</div>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div> */}

      <div className="max-w-4xl px-10 my-10 mx-auto py-6 bg-white rounded-lg shadow-md drop-shadow-lg">
        <div className="flex justify-between">
          <div className="flex justify-between items-center">
            <span className="font-light text-gray-600">{date}</span>
          </div>
          <div className="flex items-center justify-center">
            <a
              className="px-2 py-1 bg-indigo-500 text-gray-100 font-bold rounded hover:bg-indigo-600"
              href="#"
            >
              {course}
            </a>
            <div className="relative inline-block tooltip">
              <div to="" className="hover:text-gray-400 px-2 py-1 font-medium">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              </div>
              <div className="flex flex-col p-4 bg-white w-max h-max rounded-md z-20 absolute right-0 invisible tooltip-item border-solid">
                <ul className="list-disc space-y-2">
                  <li className="flex items-start">{tag}</li>
                </ul>
                <ul className="list-disc space-y-2">
                  <li className="flex items-start">sth to add</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-2">
          <a
            className="text-2xl text-gray-700 font-bold hover:text-gray-600"
            href="#"
          >
            Title: Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          </a>
          <p className="mt-2 text-gray-600">{content}</p>
        </div>
        <div className="flex justify-between items-center mt-4">
          <a className="font-medium text-blue-600 hover:underline" href="#">
            View Team
          </a>
          <div>
            <Link href={`/users/${uid}`}>
              <a className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-full bg-slate-400 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-300 via-indigo-400 to-indigo-500"></div>
                <h1 className="text-gray-700 font-bold">{author}</h1>
              </a>
            </Link>
          </div>
        </div>
      </div>

      {/* <div className="flex items-center justify-center ">
        <div className="rounded-xl border p-5 shadow-md w-full bg-white h-96">
          <div className="flex w-full items-center justify-between border-b pb-3">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-full bg-slate-400 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-300 via-indigo-400 to-indigo-500"></div>

              <Link href={`/users/${uid}`}>
                <div className="text-lg font-bold text-slate-700">{author}</div>
              </Link>
            </div>
            <div className="flex items-center">
              <div className="text-xs text-neutral-500">{date}</div>
              <div>
                <Dropdown
                  caret
                  color="secondary"
                  className=""
                  placement="left-start"
                  label={""}
                >
                  {tag}
                  <Dropdown.Item>View Team</Dropdown.Item>
                </Dropdown>
              </div>
            </div>
          </div>
          <div className="mt-4 mb-6">
            <div className="mb-3 text-xl font-bold">Course</div>
            <div className="text-sm text-neutral-600">{course}</div>
          </div>
          <hr />
          <div className="mt-4 mb-6">
            <div className="text-sm text-neutral-600">{content}</div>
          </div>
          <div>
            <div className="flex items-center justify-between text-slate-500">
              <div className="flex space-x-4 md:space-x-8">
                <div className="flex cursor-pointer items-center transition hover:text-slate-600">
                  <span>LOL something goes here</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}
