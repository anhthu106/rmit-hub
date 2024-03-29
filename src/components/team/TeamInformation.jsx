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
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-5 mx-auto md:px-32">
          <div className="p-5 min-w-full bg-white flex items-center mx-auto border-b  mb-10 border-gray-200 rounded-xl sm:flex-row flex-col shadow-md">
            {/* <div className="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center flex-shrink-0 bg-indigo-500"></div> */}
            <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
              <h1 className="text-black text-2xl title-font font-bold mb-2">
                {Name}
              </h1>
              <p className="leading-relaxed text-base">{Description}</p>
              <div className="py-4"></div>
              <div className="flex font-bold text-gray-800">
                <div className="w-full min-w-max sm:space-x-6 sm:flex space-y-6 sm:space-y-0">
                  <div className="sm:w-full">
                    <h2 className="text-gray-500">Member({Member})</h2>
                    <ul>
                      {User.map((id) => (
                        <li key={id}>{id}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="sm:w-full">
                    <h2 className="text-gray-500">Course</h2>
                    <p className="break-words w-52 sm:w-full">{CourseId}</p>
                  </div>
                </div>
              </div>
              <Link href={`/team/${TeamID}`}>
                <a className="mt-3 text-indigo-500 font-semibold inline-flex items-center">
                  View Team
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
    </div>
  );
}
