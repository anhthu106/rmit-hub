import { Button } from "../button/Button";

export default function DropDownHamburger({ tag, nameTag, buttonFnc }) {
  return (
    <div>
      <Button
        type="button"
        style="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100"
        fn={buttonFnc}
        options={
          <span>
            {tag}
            <span className="flex-1 ml-3 text-left whitespace-nowrap">
              {nameTag}
            </span>
          </span>
        }
      />
    </div>
  );
}
