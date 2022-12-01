import connectDB from '../../../backend/lib/connectDB'
import Users from '../../../backend/models/user'
import {StatusCodes} from "http-status-codes"
import jwt from "jsonwebtoken"
import {sendConfirmationEmail} from "../../../backend/helper/auth/mailler";

export default async function handler(req, res) {
    await connectDB();
    const body = req.body

    const user = await Users.findOne({$or: [{email: body.email}, {username: body.username}]})
    if (!user) {
        //Create token to verify email
        const token = jwt.sign({...body}, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_VERIFY_LIFETIME
        })
        //Send Email
        await sendConfirmationEmail({toUser: body, token})
        res.status(StatusCodes.CREATED).json({message: "Verify email is sent which have 5 minutes expires"})
    } else {
        if (user.email === body.email && user.username === body.username) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "This account already created"})
        } else if (user.username === body.username) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "This username  is used"})
        } else {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "This email  is used"})
        }
    }
}