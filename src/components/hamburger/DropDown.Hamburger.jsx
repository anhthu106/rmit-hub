export default function DropDownHamburger({ tag, nameTag, buttonFnc }) {
  return (
    <div>
      <button
        type="button"
        className="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
        onClick={buttonFnc}
      >
        {tag}
        <span className="flex-1 ml-3 text-left whitespace-nowrap">{nameTag}</span>
      </button>

      
    </div>
  );
}
