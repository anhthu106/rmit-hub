import connectDB from "../../../lib/connectDB";
import Users from "../../../models/user.models";
import {StatusCodes} from "http-status-codes";

export default async function handler(req, res) {
    try {
        await connectDB()
        switch (req.method) {
            case "GET": {
                const user = await Users.find({}, "_id username email campus major")
                res.status(StatusCodes.OK).json(user)
            }
        }
    } catch
        (Error) {
        console.log(Error)
        throw new Error("Something Wrong")
    }
}