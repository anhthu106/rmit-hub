export default function Search({ onchange }) {
  return (
    <input
        className="border-2 border-gray-300 bg-white  px-5 rounded-full text-sm focus:outline-none max-w-[50%]"
        type="search"
        name="search"
        placeholder="Search"
        onChange={onchange}
      />
  );
}
