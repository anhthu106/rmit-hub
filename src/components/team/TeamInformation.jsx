import Link from "next/link";

export default function TeamInformation({
  Name,
  User,
  CourseId,
  Member,
  Description,
  TeamID,
}) {
  return (
    <div>
      <section>
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-5 mx-auto">
            <div className="p-5 bg-white flex items-center mx-auto border-b  mb-10 border-gray-200 rounded-lg sm:flex-row flex-col">
              <div className="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center flex-shrink-0 bg-indigo-500">
              </div>
              <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                <h1 className="text-black text-2xl title-font font-bold mb-2">
                  {Name}
                </h1>
                <p className="leading-relaxed text-base">{Description}</p>
                <div className="py-4">
                  {/* <div className=" inline-block mr-2">
                    <div className="flex  pr-2 h-full items-center">
                      <svg
                        className="text-yellow-500 w-6 h-6 mr-1"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <circle cx="12" cy="12" r="9" />
                        <path d="M9 12l2 2l4 -4" />
                      </svg>
                      <p className="title-font font-medium">Python</p>
                    </div>
                  </div>

                  <div className=" inline-block mr-2">
                    <div className="flex  pr-2 h-full items-center">
                      <svg
                        className="text-gray-500 w-6 h-6 mr-1"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="15" y1="9" x2="9" y2="15" />
                        <line x1="9" y1="9" x2="15" y2="15" />
                      </svg>
                      <p className="title-font font-medium">Javascript</p>
                    </div>
                  </div> */}
                </div>
                <div className="md:flex font-bold text-gray-800">
                  <div className="w-full md:w-1/2 flex space-x-3">
                    <div className="w-1/2">
                      <h2 className="text-gray-500">Title</h2>
                      <p>Place Holder</p>
                    </div>
                    <div className="w-1/2">
                      <h2 className="text-gray-500">Member</h2>
                      <p>{Member}</p>
                      <ul>
                        {User.map((id) => (
                          <li key={id}>{id}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 flex space-x-3">
                    <div className="w-1/2">
                      <h2 className="text-gray-500">Course</h2>
                      <p>{CourseId}</p>
                    </div>
                    {/* <div className="w-1/2">
                      <h2 className="text-gray-500">Title</h2>
                      <p>description</p>
                    </div> */}
                  </div>
                </div>
                <Link href={`/team/${TeamID}`}>
                  <a className="mt-3 text-indigo-500 font-semibold inline-flex items-center">
                    Learn More
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </section>

      {/* <div>Team Lead: {Name}</div>
      <ul>
        {User.map((id) => (
          <li key={id}>{id}</li>
        ))}
      </ul>
      <div>{CourseId}</div>
      <div>{Member}</div>
      <div>{Description}</div> */}


    </div>
  );
}
