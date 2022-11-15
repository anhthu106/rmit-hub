import connectDB from "../../../../backend/lib/connectDB";
import Lists from "../../../../backend/models/list";
import { StatusCodes } from "http-status-codes";

export default async function handler(req, res) {
    try {
        await connectDB()
        switch (req.method) {
            // create post
            case "POST": {
                const listValue = {
                    title: req.body.title,
                    team_id: req.body.teamID,
                }
                const list = await Lists.create(listValue)

                res.status(StatusCodes.CREATED).json({ message: "List created" });
            }
        }
    } catch
    (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error })
    }

}