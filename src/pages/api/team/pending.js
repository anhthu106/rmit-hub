import connectDB from "../../../backend/lib/connectDB";
import Teams from "../../../backend/models/team";
import { StatusCodes } from "http-status-codes";

export default async function handler(req, res) {
    await connectDB();

    const { teamID, status, userID } = req.body;

    if (status == "accept") {
        await Teams.findByIdAndUpdate(
            teamID,
            { $push: { userID: userID } }
        );
    }
    await Teams.findByIdAndUpdate(teamID, { $pull: { pending: userID } });
    return res.status(StatusCodes.OK).json({ message: "Team updated" })

}