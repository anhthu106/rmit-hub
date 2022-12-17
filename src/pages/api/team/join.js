import { requestToJoinTeam } from "../../../backend/helper/auth/mailler";
import connectDB from "../../../backend/lib/connectDB";
import Users from "../../../backend/models/user";
import Teams from "../../../backend/models/team";
import { StatusCodes } from "http-status-codes";

export default async function handler(req, res) {
    await connectDB();

    console.log(req.body);

    const leader = await Users.findById(req.body.leader, "email")
    const member = await Users.findById(req.body.currentUser, "username")

    const team = await Teams.findById(req.body.teamID, "pending");

    if (!team.pending.includes(member._id)) {
        await Teams.findByIdAndUpdate(req.body.teamID,
            { $push: { pending: member._id } })
        if (leader) {
            const leaderEmail = leader.email
            const memberName = member.username
            const teamID = team._id
            await requestToJoinTeam({ leaderEmail, memberName, teamID })

            res.status(StatusCodes.OK).json({ message: "Verify email is sent which have 5 minutes expires" })
        } else {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Invalid email or not found" })
        }
    }

}