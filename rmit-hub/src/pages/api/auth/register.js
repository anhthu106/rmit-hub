import connectMongo from '../../../lib/connectDB'
import Users from '../../../models/user.models'
import {StatusCodes} from "http-status-codes"
import jwt from "jsonwebtoken"
import {sendConfirmationEmail} from "../../../helper/mailler";

export default async function handler(req, res) {
    await connectMongo();
    const body = req.body
    try {
        const user = await Users.findOne({email: body.email})
        if (!user) {
            //Create token to verify email
            const token = jwt.sign({...body}, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_VERIFY_LIFETIME
            })
            //Send Email
            await sendConfirmationEmail({toUser: body, token})
            res.status(StatusCodes.CREATED).json({message: "Verify email is sent which have 5 minutes expires"})
        }
    } catch (error) {
        console.log(error.message)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: error.message})
    }


    // if (user) {
    //     res.status(500).json({ message: 'Already registered!' })
    //     return;
    // }

    // const salt = await bcrypt.genSalt(10);
    // const hashPass = await bcrypt.hash(body.password, salt)
    // const newUser = new Users({
    //     username: body.username,
    //     email: body.email,
    //     password: hashPass,
    //     campus: body.campus,
    //     major: body.major
    // })
    // await newUser.save()
    // res.status(200).json({ message: 'success' })
}
