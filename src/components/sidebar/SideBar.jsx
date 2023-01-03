export default function SideBar({ teamID, state1, state2 }) {
  const active = [
    "hover:bg-gray-100 hover:text-blue-700 rounded-lg border-b-blue-700",
    "hover:bg-gray-100 hover:text-blue-700 rounded-lg border-b-blue-700 border-b-2 text-blue-500",
  ];

  return (
    <aside className="mx-auto sm:mx-0 w-fit md:flex-col items-start bg-white text-gray-700 shadow border-white border h-full mt-6 rounded-lg">
      <ul className="flex mx-auto md:inline-block">
        {/* DashBoard */}

        <li className={`${active[state1]} `}>
          <a
            href={`/team/${teamID}`}
            className="h-16 px-6 flex justify-start items-center w-full
focus:text-blue-500 space-x-3auto"
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
                d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
              />
            </svg>
            <p className="text-sm font-medium	md:block hidden">DashBoard</p>
          </a>
        </li>

        {/* Team */}
        <li className={`${active[state2]} `}>
          <a
            href={`/team/${teamID}` + "/Management"}
            className="h-16 px-6 flex justify-start items-center w-full
focus:text-blue-500 space-x-3"
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
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <p className="text-sm font-medium	md:block hidden">Management</p>
          </a>
        </li>
      </ul>
    </aside>
  );
}
