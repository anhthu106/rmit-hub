import jwt from "jsonwebtoken";
import Users from "../../../../models/user.models";

export default async function active(req, res) {
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
    return(
        <div>
            Thank for conforming
        </div>
    )
}