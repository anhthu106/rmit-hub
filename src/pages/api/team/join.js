import { requestToJoinTeam } from "../../../backend/helper/auth/mailler";
import connectDB from "../../../backend/lib/connectDB";
import Users from "../../../backend/models/user";
import Teams from "../../../backend/models/team";
import { StatusCodes } from "http-status-codes";

export default async function handler(req, res) {
    await connectDB()
    const leader = await Users.findById(req.body.leader, "email username")
    const member = await Users.findById(req.body.currentUser, "username team_id course_id")

    const team = await Teams.findById(req.body.teamID, "pending courseID");

    if ((!team.pending.includes(member._id)) && (leader) && (!member.course_id.includes(team.courseID))) {
        await Teams.findByIdAndUpdate(req.body.teamID,
            { $push: { pending: member._id } })
        const leaderEmail = leader.email
        const leaderName = leader.username
        const memberName = member.username
        const teamID = team._id

        await requestToJoinTeam({ leaderEmail, leaderName, memberName, teamID })
        res.status(StatusCodes.OK).json({ message: "Please check you email" })
    } else {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Cannot join the team" })

    }

}