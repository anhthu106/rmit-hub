import connectMongo from '../../../backend/lib/connectDB'
import Users from '../../../backend/models/user'
import { StatusCodes } from "http-status-codes"
import jwt from "jsonwebtoken"
import { sendConfirmationEmail } from "../../../backend/helper/auth/mailler";

export default async function handler(req, res) {
    await connectMongo();
    const body = req.body

    const user = await Users.findOne({email: body.email})
    if (!user) {
        //Create token to verify email
        const token = jwt.sign({...body}, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_VERIFY_LIFETIME
        })
        //Send Email
        await sendConfirmationEmail({toUser: body, token})
        res.status(StatusCodes.CREATED).json({message: "Verify email is sent which have 5 minutes expires"})
    } else {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "This email was used"})
    }
}