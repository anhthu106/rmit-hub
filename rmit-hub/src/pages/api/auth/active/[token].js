import jwt from "jsonwebtoken";
import Users from "../../../../backend/models/user";
import { StatusCodes } from "http-status-codes";
import Major from "../../../../backend/models/major";
import major from "../../../../backend/models/major";

export default async function handle(req, res) {
    try {
        //Check header
        const { token } = req.query
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        //    Attach the user to the job routes
        //    req.user = {userId: payload.userID, name: payload.name}
        //     req.user = req.body
        const data = await Major.findOne({name: payload.major}, "_id").lean()
        const majorId = data._id.toString()

        req.user = {
            username: payload.username,
            email: payload.email,
            password: payload.password,
            campus: payload.campus,
            major_id: majorId
        }
        await Users.create(req.user)
        res.status(StatusCodes.CREATED).redirect("/api/auth/signin/")
    } catch (error) {
        console.log(error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    }

}