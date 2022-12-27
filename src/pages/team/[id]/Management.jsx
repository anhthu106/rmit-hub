import {useSession} from "next-auth/react";
import Teams from "../../../backend/models/team";
import Users from "../../../backend/models/user";
import Majors from "../../../backend/models/major";
import importRawData from "../../../backend/helper/data/data";
import Header from "../../../components/header/Header";
import SideBar from "../../../components/sidebar/SideBar";
import Course from "../../../backend/models/course";
import TeamLeaderPage from "../../../pageComponents/team/TeamLeaderPage";
import TeamMemberPage from "../../../pageComponents/team/TeamMemberPage";

export async function getServerSideProps({params}) {
    let userPending = [];
    let userDataPending;
    let user = [];
    let userData;


    const teamData = await Teams.findById(params.id, "pending userID courseID name Description").populate("courseID", "name", Course)

    const team = {
        id: teamData._id.toString(),
        leader: teamData.userID[0].toString(),
        courseName: teamData.courseID.name,
        name: teamData.name.toString(),
        Description: teamData.Description.toString(),
    };


    for (let i of teamData.pending) {
        userDataPending = await Users.findById(i, "image username email campus major_id").populate("major_id", "name -_id", Majors);
        userPending.push(userDataPending);
    }

    for (let x of teamData.userID) {
        userData = await Users.findById(x, "image username email campus major_id").populate("major_id", "name -_id", Majors);
        user.push(userData);
    }

    userPending = importRawData(userPending, ["_id"], null);

    user = importRawData(user, ["_id"], null);

    return {
        props: {
            userPending: userPending, userProps: user, team,
        },
    };
}

export default function Management({userProps, userPending, team, tag}) {
    const {data: session} = useSession();
    const currentUser = session.user._id;
    if (currentUser === team.leader) {
        return (
            <div className="bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200 min-h-screen">
                <Header/>

                <div className="text-gray-700">
                    <div className="flex-col w-screen max-h-screen ">
                        <div className="md:px-10 px-3 pt-6  ">
                            <h1 className="text-2xl font-bold ">{team.name}</h1>
                            <div className="flex">
                                <SideBar teamID={team.id} state1={0} state2={1}/>
                                <section className="w-3/4">
                                    <TeamLeaderPage
                                        team={team}
                                        userPending={userPending}
                                        userProps={userProps}
                                        session={session}
                                    />
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200 min-h-screen">
                <Header/>

                <div className="text-gray-700">
                    <div className="flex-col w-screen max-h-screen ">
                        <div className="md:px-10 px-3 pt-6  ">
                            <h1 className="text-2xl font-bold ">{team.name}</h1>
                            <div className="flex">
                                <SideBar teamID={team.id} state1={0} state2={1}/>
                                <section className="w-3/4">
                                    <TeamMemberPage
                                        team={team}
                                        userProps={userProps}
                                        session={session}
                                    />
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

Management.auth = true;
