import DisplayTeamInfo from "../../components/team/DisplayTeamInfo";
import DisplayTeamMembers from "../../components/team/DisplayTeamMembers";

export default function TeamMemberPage({team, userProps, session}) {
    return (
        <div className="pt-6 px-4">
            <div className="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
                <div
                    className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8  2xl:col-span-2">
                    <DisplayTeamInfo
                        team={team}
                    />
                </div>

                <DisplayTeamMembers team={team} userProps={userProps} session={session}/>

            </div>


        </div>
    )

}