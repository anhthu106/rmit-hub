// BACKEND
import connectDB from "../../../backend/lib/connectDB";
import { useSession } from "next-auth/react";
import importRawData from "../../../backend/helper/data/data";
import { addItems } from "../../../backend/helper/items/items";

import Teams from "../../../backend/models/team";
import Users from "../../../backend/models/user";
import Majors from "../../../backend/models/major";

import Button from "../../../components/button/Button"
import UserInformation from "../../../components/users/UserInformation";
import { useState } from "react";
export async function getServerSideProps({ params }) {
    await connectDB();

    const teamData = await Teams.findById(params.id, "pending userID")

    const team = {
        id: teamData._id.toString(),
        leader: teamData.userID[0].toString()
    }

    console.log(team)
    let user = []
    let userData
    for (let i of teamData.pending) {
        userData = await Users.findById(i, "image username email campus major_id").populate("major_id", "name -_id", Majors)
        user.push(userData)
    }


    user = importRawData(user, ["_id"], null);

    return {
        props: {
            userProps: user,
            team
        },
    }
}

export default function TeamDetail({ userProps, team }) {
    const [message, setMessage] = useState("")
    const teamID = team.id
    const leaderID = team.leader
    const { data: session } = useSession();

    if (session.user._id === leaderID) {
        return (
            <div>
                {userProps.map((user) => (
                    <div key={user._id}>
                        <UserInformation
                            username={user.username}
                            email={user.email}
                            campus={user.campus}
                            major={user.major_id.name}
                            image={user.image.imgURL}
                        />

                        <Button
                            fn={(e) =>
                                addItems(
                                    {
                                        teamID: teamID,
                                        status: "accept",
                                        userID: user._id
                                    },
                                    e,
                                    setMessage,
                                    "/api/team/pending"
                                )
                            }
                            options={"Accept Request"}
                        />
                        <Button
                            fn={(e) =>
                                addItems(
                                    {
                                        teamID: teamID,
                                        status: "reject",
                                        userID: user._id
                                    },
                                    e,
                                    setMessage,
                                    "/api/team/pending"
                                )
                            }
                            options={"Reject Request"}
                        />
                    </div>
                ))}
            </div>
        )
    } else {
        return (
            <div>You do not have authorization to access to this page!</div>
        )
    }
}
TeamDetail.auth = true;

