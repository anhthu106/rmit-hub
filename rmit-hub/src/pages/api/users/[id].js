import connectMongo from "../../../backend/lib/connectDB";
import Users from "../../../backend/models/user";
import {StatusCodes} from "http-status-codes";
import Major from "../../../backend/models/major";

export default async function handler(req, res) {
    /**
     * Backend specific user information
     */
    try {
        await connectMongo()
        switch (req.method) {
            case "PATCH": {
                /**
                 * Update Information
                 */
                const {
                    body: {username, campus, major},
                    query: {id}
                } = req

                if (username === "" || campus === "" || major === "") {
                    new Error.json({message: "Please fill out the box"})
                }
                const majorName = await Major.findOne({name: req.body.major}, "_id").lean()
                const majorID = majorName._id.toString()

                const newUser = {
                    username: req.body.username,
                    campus: req.body.campus,
                    major_id: majorID
                }
                const user = await Users.findByIdAndUpdate(
                    id, newUser, {new: true, runValidators: true}
                )
                if (!user) {
                    new Error.json({message: "User not found"})
                }
                return res.status(StatusCodes.OK).json({message: "Your account updated"})
            }
        }
    } catch (Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({Error})
    }

}