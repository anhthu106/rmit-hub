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
                const { name, userID, description, course } = req.body;

                const userData = await User.findById(userID, "course_id");

                const data = await Course.findOne({ name: course }, "_id").lean()
                const courseId = data._id.toString()
                
                if (!userData.course_id.includes(courseId)) {
                    const teamValue = {
                        name: name,
                        userID: userID,
                        courseID: courseId,
                        Description: description
                    }
                    const team = await Teams.create(teamValue)

                    const userId = team.userID
                    for (let i = 0; i < userId.length; i++) {
                        const id = userId[i].toString()
                        await User.findByIdAndUpdate(id, {
                            $push: {
                                team_id: team._id.toString(),
                                course_id: courseId
                            }
                        })
                    }
                    return res.status(StatusCodes.CREATED).json({ message: "Team created" });
                } else {
                    return res.status(StatusCodes.FORBIDDEN).json({ message: "You have already create a team in this course!" })
                }
            }
        }
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error })
    }

}