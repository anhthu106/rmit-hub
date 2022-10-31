import connectMongo from "../../../backend/lib/connectDB";
import {StatusCodes} from "http-status-codes";
import Course from "../../../backend/models/course";
import Teams from "../../../backend/models/team";

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
                        body: {newName, newCourse, newDescription},
                        query: {id}
                    } = req
                    if (newName === "" || newCourse === "" || newDescription === "") {
                        new Error.json({message: "Please fill out the box"})
                    }
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
                }catch (e){
                    console.log(e)
                }

            }
        }
    } catch (Error) {
        console.log(Error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({Error})
    }

}