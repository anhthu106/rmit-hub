import Image from "next/image";
export default function HeroSection() {
  return (
    <section>
      <div className="relative overflow-hidden bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="relative z-10 bg-white pb-8 sm:pb-16 md:pb-20 lg:w-full lg:max-w-2xl lg:pb-28 xl:pb-32">
            <svg
              className="absolute inset-y-0 right-0 hidden h-full w-48 translate-x-1/2 transform text-white lg:block"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="50,0 100,0 50,100 0,100" />
            </svg>

            <div className="relative px-4 pt-6 sm:px-6 lg:px-8"></div>

            <main className="mx-auto mt-10 max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">RMIT-HUB</span>
                  <br />
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 xl:inline">
                    Find Your Teammate
                  </span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
                  Rmit-Hub is a website for user to create posts and collaborate
                  on kanban style all in in a completely visual canvas
                  <span className="font-medium bg-gradient-to-r from-blue-600  to-pink-600 bg-clip-text text-transparent">
                    — all in one website.
                  </span>
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <a
                      href="#more"
                      className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 md:py-4 md:px-10 md:text-lg"
                    >
                      Find Out More
                    </a>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <div className="my-20 lg:my-0">
            <Image
              className="h-56 w-full object-cover sm:h-72 md:h-96 lg:h-full lg:w-full"
              src="https://www.rmit.edu.vn/content/dam/rmit/vn/en/assets-for-production/images/rmit-sgs-campus-facilities/2019-campus-photos/sgs-campus-night-05.jpg"
              alt=""
              width="1000"
              height="500"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
