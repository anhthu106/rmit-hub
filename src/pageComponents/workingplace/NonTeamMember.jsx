import { useState } from "react";
import { addItems } from "../../backend/helper/items/items";
import Button from "../../components/button/Button";

export default function NonTeamMember({ TeamInfo, currentUser }) {
    const [message, setMessage] = useState("")
    console.log(currentUser)
    return (
        // TODO Display all team information and joining function
        <div>
            {/*Team name*/}
            <div>{TeamInfo.name}</div>
            {/*    Team Description*/}
            <div>{TeamInfo.description}</div>

            {/*    Team Course*/}
            <div>{TeamInfo.course}</div>

            {/*    Team Member*/}
            {TeamInfo.user.map((member) => (
                <div>{member}</div>
            ))}

            <Button
                fn={(e) =>
                    addItems({
                        currentUser: currentUser,
                        leader: TeamInfo.userId[0],
                        teamID: TeamInfo._id
                    }, e, setMessage, "/api/team/join")
                }
                options={"Request to join"}
            />
        </div>
    )
}