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

    const teamData = await Teams.findById(params.id, "pending userID courseID")

    const team = {
        id: teamData._id.toString(),
        leader: teamData.userID[0].toString(),
        courseID: teamData.courseID.toString()
    }

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

    const { id, leader, courseID } = team;

    const { data: session } = useSession();

    if (session.user._id === leader) {
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
                                        teamID: id,
                                        status: "accept",
                                        userID: user._id,
                                        courseID: courseID
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
                                        teamID: team,
                                        status: "reject",
                                        userID: user._id,
                                        courseID: courseID
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

