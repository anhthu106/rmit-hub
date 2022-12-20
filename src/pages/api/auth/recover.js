import connectDB from "../../../backend/lib/connectDB";
import Users from "../../../backend/models/user";
import jwt from "jsonwebtoken";
import {StatusCodes} from "http-status-codes";
import {recoverPasswordEmail} from "../../../backend/helper/auth/mailler";

export default async function handler(req, res) {
    await connectDB();

    //Take the user value
    const user = await Users.findOne({email: req.body.email})
    console.log(user);

    if (user) {
        const email = user.email;
        // Create token
        const token = jwt.sign({email}, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_VERIFY_LIFETIME
        })
        // Send Email
        await recoverPasswordEmail({email, token})

        res.status(StatusCodes.OK).json({message: "Verify email is sent which have 5 minutes expires"})
    }else{
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Invalid email or not found"})
    }
}