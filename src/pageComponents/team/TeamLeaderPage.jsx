import DisplayTeamInfo from "../../components/team/DisplayTeamInfo";
import EditTeam from "../../components/team/EditTeam";
import DisplayTeamMembers from "../../components/team/DisplayTeamMembers";
import PendingList from "../../components/team/PendingList";

export default function TeamLeaderPage({
  team,
  userPending,
  userProps,
  session,
}) {
  return (
    <div className="pt-6 px-4">
      <div className="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
        <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 2xl:col-span-2 min-w-fit ">
          <DisplayTeamInfo
            team={team}
            tag={
              <EditTeam
                team={team}
                preName={team.name}
                preDescription={team.Description}
                id={team.id}
              />
            }
          />
        </div>

        <DisplayTeamMembers
          team={team}
          userProps={userProps}
          session={session}
        />
      </div>

      <PendingList team={team} userPending={userPending} />
    </div>
  );
}
