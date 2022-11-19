export default function Button({ fn, options }) {
  return (
    <div>
      <button
        className="w-full  bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-white text-center"
        onClick={fn}
      >
        {options}
      </button>
    </div>
  );
}
