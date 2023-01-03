export default function FeatureSections() {
  return (
    <div className="bg-slate-800 py-12 px-5" id="more">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <p className="mt-2 text-3xl font-bold leading-8 tracking-tight text-white sm:text-4xl">
            A better way to find your teammates
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-400 lg:mx-auto">
            Create team work place and start looking for your teammate
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 md:space-y-0">
            <Feature
              title="Create an account"
              description="Keep track of everything you do. Build yourself a profile with basic information which will support you in finding a team."
              svg={
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
                    strokeWidth="2"
                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              }
            />
            <Feature
              title="Look for teammates"
              description="Make a post to search for team members. The website only display 'finding member post' so you don't have to worry about your post getting mix-up with other."
              svg={
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
                    strokeWidth="2"
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  ></path>
                </svg>
              }
            />

            <Feature
              title="Search for team"
              description="Having trouble find team when entering a new courses? Worry no more because you can scroll through your feed and look a team right away."
              svg={
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
                    strokeWidth="2"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  ></path>
                </svg>
              }
            />

            <Feature
              title="Organize your team"
              description="Collaborate with other team members using Kanban board without the trouble of switching between many different sites. Each team can have a workplace to engaged with each other."
              svg={
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
                    strokeWidth="2"
                    d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
                  ></path>
                </svg>
              }
            />
          </dl>
        </div>
      </div>
    </div>
  );
}

function Feature(props) {
  return (
    <div className="relative">
      <dt>
        <div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-indigo-500 text-white">
          {props.svg}
        </div>
        <p className="ml-16 text-lg font-medium leading-6 text-white">
          {props.title}
        </p>
      </dt>
      <dd className="mt-2 ml-16 text-base text-gray-500">
        {props.description}
      </dd>
    </div>
  );
}
