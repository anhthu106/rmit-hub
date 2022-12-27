import DisplayTeamInfo from "../../components/team/DisplayTeamInfo";
import EditTeam from "../../components/team/EditTeam";
import DisplayTeamMembers from "../../components/team/DisplayTeamMembers";
import PendingList from "../../components/team/PendingList";
import {Button} from "../../components/button/Button";
import {deleteItems} from "../../backend/helper/items/items";

export default function TeamLeaderPage({team, userPending, userProps, session}) {
    return (
        <div className="pt-6 px-4">
            <div className="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
                <div
                    className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8  2xl:col-span-2">
                    <DisplayTeamInfo
                        team={team}
                        tag={
                            <EditTeam
                                preName={team.name}
                                preDescription={team.Description}
                                id={team.id}
                            />
                        }
                    />
                </div>

                <DisplayTeamMembers team={team} userProps={userProps} session={session}/>

            </div>

            <PendingList team={team} userPending={userPending}/>

            <div
                className="mt-4 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                                                        <span
                                                            className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                                                          Delete Team
                                                          </span>
                        </div>
                        <Button
                            type={"button"}
                            style="ml-5 w-0 flex items-center justify-end flex-1 text-red-500 text-base font-bold hover:bg-red-300"
                            fn={(e) => {
                                deleteItems(null, e, `../../api/team/${team.id}`);
                            }}
                            options={"Delete Team"}
                        />
                    </div>
                </div>
            </div>
        </div>)

}