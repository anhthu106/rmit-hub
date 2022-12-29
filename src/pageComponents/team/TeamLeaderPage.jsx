import DisplayTeamInfo from "../../components/team/DisplayTeamInfo";
import EditTeam from "../../components/team/EditTeam";
import DisplayTeamMembers from "../../components/team/DisplayTeamMembers";
import PendingList from "../../components/team/PendingList";
import { Button } from "../../components/button/Button";
import { deleteItems } from "../../backend/helper/items/items";
import { useState } from "react";

export default function TeamLeaderPage({ team, userPending, userProps, session }) {
    const [message, setMessage] = useState(null);
    return (
        <div className="pt-6 px-4">
            <div className="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
                <div
                    className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 2xl:col-span-2 min-w-fit ">
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

                <DisplayTeamMembers team={team} userProps={userProps} session={session} />
            </div>

            <PendingList team={team} userPending={userPending} />

        </div>)

}