import {StatusCodes} from "http-status-codes";
import Users from "../../../../backend/models/user";
import bcrypt from "bcrypt";

export default async function handle(req, res) {
    try {
        //Check header
        const {email} = req.query


        const salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(req.body.password, salt)

        const user = await Users.findOneAndUpdate({email: email}, req.body, {new: true, runValidators: true})

        res.status(StatusCodes.OK).json({message: "Updated"})

    } catch (e) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: e})
    }

}