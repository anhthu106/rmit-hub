export default function DisplayTeamInfo({team, tag}) {
    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <div className="flex-shrink-0">
                                                        <span
                                                            className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                                                            {team.name}
                                                        </span>
                    <h3 className="text-base font-normal text-gray-500">
                        Depression
                    </h3>
                </div>
                <div
                    className="flex items-center justify-end flex-1 text-green-500 text-base font-bold">
                    {/* TODO Dư thừa không xài thì xoá đi */}
                    100%
                    <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                </div>
            </div>
            <div>
                {/*Description*/}
                {team.Description}
            </div>
            {tag}
        </div>
    )
}