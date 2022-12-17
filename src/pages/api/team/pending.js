import connectDB from "../../../backend/lib/connectDB";
import Teams from "../../../backend/models/team";
import Users from "../../../backend/models/user";

import { StatusCodes } from "http-status-codes";

export default async function handler(req, res) {
    await connectDB();

    const { teamID, status, userID, courseID } = req.body;

    if (status == "accept") {
        await Teams.findByIdAndUpdate(
            teamID,
            { $push: { userID: userID } }
        );

        await Users.findByIdAndUpdate(
            userID,
            {
                $push: {
                    team_id: teamID,
                    course_id: courseID
                }
            }
        )
    }
    await Teams.findByIdAndUpdate(teamID, { $pull: { pending: userID } });
    return res.status(StatusCodes.OK).json({ message: "Team updated" })

}