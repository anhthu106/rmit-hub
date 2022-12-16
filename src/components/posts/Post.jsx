import Link from "next/link";
import Image from "next/image";

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
      <div className="px-4 py-1">
        <div className="bg-white border rounded-xl shadow-md">
          <div className=" px-4 py-3 ">
            <div className="flex justify-between">
              <div className="flex justify-between items-center w-fit">
                <Link href={`/users/${uid}`} >
                  <Image
                    className="h-10 w-10 rounded-full object-fill cursor-pointer	"
                    src={avatar}
                    alt="Avatar"
                    width="50"
                    height="50"
                  />
                </Link>

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
                    {/* <ul className="list-disc space-y-2">
                      <li className="flex items-start">sth to add</li>
                    </ul> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="overflow-y-auto px-3 h-full bg-white border-r border-gray-200"></div>
          <div className="flex items-center justify-between mx-4 mt-3 mb-2 sm:px-auto">
            <div className="flex px-2 py-1 bg-indigo-500 text-gray-100 font-bold text-sm md:text-base rounded cursor-default	">
              <svg
                className="w-6 h-6 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>

              {course}
            </div>
          </div>
          <div className="flex items-center justify-between mx-4 mt-3 mb-2">
            <p>{content}</p>
          </div>
          <div className="px-4 grid place-content-center pb-6">
            <Image
              className="h-fit w-auto rounded-lg object-contain border-solid border-2 border-gray-100"
              src={image}
              alt="post"
              layout="intrinsic"
              width="700"
              height="700"
              objectFit="cover" // change to suit your needs
            />
          </div>
          {/* <div className="flex items-center justify-between mx-4 mt-3 mb-2">
            <div className="flex gap-5">LOL</div>
            <a
              className="flex font-medium text-blue-600 hover:underline"
              href="#"
            >
              View Team
            </a>
          </div>
          <div className="font-semibold text-sm mx-4 mt-2 mb-4"></div> */}
        </div>
      </div>
    </>
  );
}
