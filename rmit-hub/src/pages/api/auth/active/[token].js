import jwt from "jsonwebtoken";
import Users from "../../../../models/user.models";
import {StatusCodes} from "http-status-codes";
import NextAuth from "next-auth";
import {signIn} from "next-auth/react";
import {fetchData} from "../../../../helper/fetch-data";


export default async function handle(req, res) {
    try {
        //Check header
        const {token} = req.query
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        //    Attach the user to the job routes
        //    req.user = {userId: payload.userID, name: payload.name}
        //     req.user = req.body
        req.user = {
            username: payload.username,
            email: payload.email,
            password: payload.password,
            campus: payload.campus,
            major: payload.major
        }
        await Users.create(req.user)
        res.status(StatusCodes.CREATED).redirect("/api/auth/signin/")
    } catch (error) {
        console.log(error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    }

}