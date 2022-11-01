import connectMongo from "../../../backend/lib/connectDB";
import {StatusCodes} from "http-status-codes";
import Teams from "../../../backend/models/team";
import Course from "../../../backend/models/course";

export default async function handler(req, res) {
    /**
     * Backend specific team information
     */
    try {
        await connectMongo()
        switch (req.method) {
            case "PATCH": {
                try {
                    /**
                     * Update Information
                     */
                    const {
                        query: {id}
                    } = req
                    //Update Team information
                    if (req.body.newName && req.body.newCourse && req.body.newDescription) {
                        const courseName = await Course.findOne({name: req.body.newCourse}, "_id").lean()
                        const courseId = courseName._id.toString()

                        const newTeam = {
                            name: req.body.newName,
                            courseID: courseId,
                            Description: req.body.newDescription
                        }

                        const team = await Teams.findByIdAndUpdate(
                            id, newTeam, {new: true, runValidators: true}
                        )
                        if (!team) {
                            new Error.json({message: "Team not found"})
                        }

                        return res.status(StatusCodes.OK).json({message: "Your account updated"})
                    } else if (req.body.userId) { //Update Team members
                        const team = await Teams.findById(id)
                        team.userID.push(req.body.userId)
                        await team.save()
                        return res.status(StatusCodes.OK).json({message: "Welcome"})
                    }
                } catch (e) {
                    console.log(e)
                }
            }
            case "DELETE": {
                try {
                    /**
                     * Delete User from Team
                     */
                    const {
                        query: {id}
                    } = req
                    const team = await Teams.findById(id)
                    team.userID.pull(req.body.userId)
                    await team.save()
                    return res.status(StatusCodes.OK).json({message: "Deleted"})
                } catch (e) {
                    console.log(e)
                }
            }
        }
    } catch
        (Error) {
        console.log(Error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({Error})
    }

}