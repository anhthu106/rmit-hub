import connectDB from "../../../backend/lib/connectDB";
import Teams from "../../../backend/models/team";
import { StatusCodes } from "http-status-codes";
import User from "../../../backend/models/user";
import Course from "../../../backend/models/course";


export default async function handler(req, res) {
    try {
        await connectDB()
        switch (req.method) {
            case "POST": {
                const data = await Course.findOne({ name: req.body.course }, "_id").lean()
                const courseId = data._id.toString()

                const teamValue = {
                    name: req.body.name,
                    userID: req.body.userID,
                    courseID: courseId,
                    Description: req.body.description
                }
                const team = await Teams.create(teamValue)

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
                res.status(StatusCodes.CREATED).json({ message: "Team created" });
            }
        }
    } catch (error) {
        console.log(error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error })
    }

}