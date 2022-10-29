import connectDB from "../../../backend/lib/connectDB";
import Teams from "../../../backend/models/team";
import {StatusCodes} from "http-status-codes";
import User from "../../../backend/models/user";


export default async function handler(req, res) {
    try {
        await connectDB()
        switch (req.method) {
            case "POST": {
                const team = await Teams.create(req.body)
                const userID = team.userID
                for (let i = 0; i < userID.length; i++) {
                    const id = userID[i].toString()
                    await User.findByIdAndUpdate(id, {
                        $push: {
                            team_id: team._id.toString(),
                            course_id: req.body.courseID
                        }
                    })
                }

                res.status(StatusCodes.CREATED).json({message: "Team created"});
            }
        }

    } catch (error) {
        console.log(error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: error})
    }

}