export default function DropDownHamburger({tag, nameTag}) {
    return (
        <div>
            {tag}
            <span
                className="flex-1 ml-3 text-left whitespace-nowrap"
            >
                {nameTag}
            </span>
        </div>

    )
}