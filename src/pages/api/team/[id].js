import connectDB from "../../../backend/lib/connectDB";
import { StatusCodes } from "http-status-codes";
import Teams from "../../../backend/models/team";
import Course from "../../../backend/models/course";
import User from "../../../backend/models/user";
import List from "../../../backend/models/list";
import Task from "../../../backend/models/task";

export default async function handler(req, res) {
    /**
     * Backend specific team information
     */
    try {
        await connectDB()
        switch (req.method) {
            case "PATCH": {
                try {
                    /**
                     * Update Information
                     */
                    const {
                        query: { id }
                    } = req
                    //Update Team information
                    if (req.body.newName && req.body.newCourse && req.body.newDescription) {
                        const courseName = await Course.findOne({ name: req.body.newCourse }, "_id").lean()
                        const courseId = courseName._id.toString()

                        const newTeam = {
                            name: req.body.newName,
                            courseID: courseId,
                            Description: req.body.newDescription
                        }

                        const team = await Teams.findByIdAndUpdate(
                            id, newTeam, { new: true, runValidators: true }
                        )
                        if (!team) {
                            new Error.json({ message: "Team not found" })
                        }

                        return res.status(StatusCodes.OK).json({ message: "Your account updated" })
                    } else if (req.body.userId) { //Update Team members
                        const team = await Teams.findById(id)
                        team.userID.push(req.body.userId)
                        await team.save()
                        return res.status(StatusCodes.OK).json({ message: "Welcome" })
                    }
                    break
                } catch (e) {
                    return e;
                }
            }
            case "DELETE": {
                try {
                    /**
                     * Delete User from Team
                     */
                    const {
                        query: { id }
                    } = req

                    //Delete main
                    const team = await Teams.findByIdAndDelete(id)

                    //Delete reference
                    await User.findByIdAndUpdate(team.userID, { $pull: { post_id: team._id } })
                    const lists = await List.find({ _id: { $in: team.listID } }, "task_id").lean()

                    await List.deleteMany({ _id: { $in: team.listID } })

                    lists.map(async (list) => {
                        await Task.deleteMany({ _id: { $in: list.task_id } })
                    })


                    return res.status(StatusCodes.OK).json({ message: "Deleted" })
                } catch (e) {
                    return e
                }
            }
        }
    } catch
    (Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ Error })
    }

}