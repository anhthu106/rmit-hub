import Link from "next/link";
export default function Post({
  author,
  date,
  content,
  course,
  tag,
  uid,
  image,
  avatar,
}) {
  return (
    <>
      {/* New */}
      <div className="p-4">
        <div className="bg-white border rounded-3xl shadow-md drop-shadow-lg">
          <div className=" px-4 py-3 ">
            <div className="flex justify-between">
              <div className="flex justify-between items-center">
                <img
                  className="h-8 w-8 rounded-full object-fill"
                  src={avatar}
                  alt="Avatar"
                />
                <div className="ml-3 ">
                  <span className="text-sm font-semibold antialiased block leading-tight">
                    <div>
                      <Link href={`/users/${uid}`}>
                        <a className="flex items-center space-x-3">
                          <h1 className="text-gray-700 font-bold">{author}</h1>
                        </a>
                      </Link>
                    </div>
                  </span>
                  <span className="text-gray-600 text-xs block">{date}</span>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative inline-block tooltip">
                  <div
                    to=""
                    className="hover:text-gray-400 px-2 py-1 font-medium"
                  >
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
                  <div className="flex flex-col p-4 bg-white w-max h-max rounded-md z-20 absolute right-0 invisible tooltip-item border-solid">
                    {tag}
                    <ul className="list-disc space-y-2">
                      <li className="flex items-start">sth to add</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="overflow-y-auto py-5 px-3 h-full bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700"></div>
          <div className="flex items-center justify-between mx-4 mt-3 mb-2 sm:px-auto">
            <div className="px-2 py-1 bg-indigo-500 text-gray-100 font-bold text-sm md:text-base rounded">
              {course}
            </div>
          </div>
          <div className="flex items-center justify-between mx-4 mt-3 mb-2">
            <p>{content}</p>
          </div>
          <img
            className="h-fit w-auto mx-auto rounded-lg object-contain px-3"
            src={image}
            alt="post"
          />
          <div className="flex items-center justify-between mx-4 mt-3 mb-2">
            <div className="flex gap-5">{/* LOL */}</div>
            <a
              className="flex font-medium text-blue-600 hover:underline"
              href="#"
            >
              View Team
            </a>
          </div>
          <div className="font-semibold text-sm mx-4 mt-2 mb-4">
            {/* LOL */}
          </div>
        </div>
      </div>
    </>
  );
}
