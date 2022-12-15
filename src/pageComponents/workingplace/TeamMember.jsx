import Header from "../../components/header/Header";
import dynamic from "next/dynamic";

const Board = dynamic(() => import("../../components/workspace/Board"));

export default function TeamMember({TeamInfo, listProps, userName}) {
    return (
        <div className="bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200 h-screen">
            <Header/>

            <div className="text-gray-700">
                <div className="flex flex-col w-screen max-h-screen ">
                    <div className="px-10 pt-6  ">
                        <h1 className="text-2xl font-bold ">{TeamInfo.name}</h1>

                        <Board
                            listProps={listProps}
                            usernameProps={userName}
                            TeamInfo={TeamInfo}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}