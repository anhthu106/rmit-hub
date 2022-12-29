import connectDB from "../../../backend/lib/connectDB";
import Users from "../../../backend/models/user";
import {StatusCodes} from "http-status-codes";
import Major from "../../../backend/models/major";

import cloudinary from "../../../backend/helper/config/cloudinary";

export default async function handler(req, res) {
    /**
     * Backend specific user information
     */
    try {
        await connectDB()
        switch (req.method) {
            case "PATCH": {
                /**
                 * Update Information
                 */
                console.log(req.body)
                const {
                    body: {username, campus, major, image},
                    query: {id}
                } = req

                if (username === "" || campus === "" || major === "") {
                    new Error.json({message: "Please fill out the box"})
                }
                const majorName = await Major.findOne({name: req.body.major}, "_id").lean()
                const majorID = majorName._id.toString()

                const result = await cloudinary.uploader.upload(image, {
                    folder: "profiles_" + id,
                })

                const newUser = {
                    username: req.body.username,
                    campus: req.body.campus,
                    major_id: majorID,
                    image: {
                        imgPublicID: result.public_id,
                        imgURL: result.secure_url
                    }
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