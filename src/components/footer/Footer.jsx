export default function Footer() {
  return (
    <footer className="bg-white ">
        <hr />
        <div className="container flex flex-col items-center justify-between p-6 mx-auto space-y-4 sm:space-y-0 sm:flex-row">
          <a
            href="./"
            className="text-2xl font-bold text-gray-800 transition-colors duration-300 hover:text-blue-500"
          >
            RMIT-HUB
          </a>

          <p className="text-sm text-gray-600 ">
            © Copyright 2023. All Rights Reserved.
          </p>
        </div>
      </footer>
  );
}
