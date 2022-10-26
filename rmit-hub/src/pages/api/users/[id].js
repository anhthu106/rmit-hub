import connectDB from "../../../backend/lib/connectDB";
import Users from "../../../backend/models/user";
import { StatusCodes } from "http-status-codes";

export default async function handler(req, res) {
    /**
     * Backend specific user information
     */
    try {
        await connectDB()
        switch (req.method) {
            case "GET": {
                /**
                 * Get information
                 */
                const { id } = req.query
                const user = await Users.findById(id, "_id username email campus major")
                return res.status(StatusCodes.OK).json(user)
            }
            case "PATCH": {
                /**
                 * Update Information
                 */
                const {
                    body: { username, campus, major },
                    query: { id }
                } = req

                if (username === "" || campus === "" || major === "") {
                    new Error.json({ message: "Please fill out the box" })
                }
                const user = await Users.findByIdAndUpdate(
                    { _id: id }, req.body, { new: true, runValidators: true }
                )
                if (!user) {
                    new Error.json({ message: "User not found" })
                }
                return res.status(StatusCodes.OK).json({ message: "Your account updated" })
            }
        }
    } catch
    (Error) {
        throw new Error("Something Wrong")
    }

}