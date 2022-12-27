import connectDB from "../../../backend/lib/connectDB";
import { StatusCodes } from "http-status-codes";

import Teams from "../../../backend/models/team";
import Users from "../../../backend/models/user";
import Course from "../../../backend/models/course";


export default async function handler(req, res) {
    await connectDB();

    const { teamID, status, userID, courseName } = req.body;

    const courseID = await Course.findOne({ name: courseName });
    
    if (status === "accept") {
        await Teams.findByIdAndUpdate(
            teamID,
            {
                $push: {
                    userID: userID,
                },
                $inc: {
                    Member: 1
                }
            }
        );

        await Users.findByIdAndUpdate(
            userID,
            {
                $push: {
                    team_id: teamID,
                    course_id: courseID._id
                }
            }
        )
    }
    await Teams.findByIdAndUpdate(teamID, { $pull: { pending: userID } });
    return res.status(StatusCodes.OK).json({ message: "Team updated" })

}