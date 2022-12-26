import {useSession} from "next-auth/react";
import connectDB from "../../../backend/lib/connectDB";
import Teams from "../../../backend/models/team";
import Users from "../../../backend/models/user";
import Majors from "../../../backend/models/major";
import importRawData from "../../../backend/helper/data/data";
import PendingList from "../../../pageComponents/team/PendingList";
import DisplayTeamMembers from "../../../pageComponents/team/DisplayTeamMembers";
import Header from "../../../components/header/Header";
import {Button} from "../../../components/button/Button";
import {deleteItems} from "../../../backend/helper/items/items";

export async function getServerSideProps({params}) {
    await connectDB();

    const teamData = await Teams.findById(params.id, "pending userID courseID");

    const team = {
        id: teamData._id.toString(), leader: teamData.userID[0].toString(), courseID: teamData.courseID.toString(),
    };

    let userPending = [];
    let userDataPending;
    let user = [];
    let userData;

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

export default function Management({userProps, userPending, team}) {
    const {data: session} = useSession();
    const currentUser = session.user._id;
    console.log(team)
    if (currentUser === team.leader) {
        return (
            <div>
                <Header/>
                {/*TODO Brings style of pendingList to here*/}
                <PendingList team={team} userPending={userPending}/>

                {/*TODO Make the list of teammate and the team leader can delete them*/}
                <DisplayTeamMembers userProps={userProps} team={team}/>

                {/*Delete Team*/}
                <Button
                    type={"button"}
                    // style={}
                    fn={(e) => {
                        deleteItems(
                            null, e, `../../api/team/${team.id}`
                        )
                    }}
                    options={"Delete Team"}
                />
            </div>

        )
    } else {
        return <div>You do not have authorization to access to this page!</div>;
    }
}

Management.auth = true;