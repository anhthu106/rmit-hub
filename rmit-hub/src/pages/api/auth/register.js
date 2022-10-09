import bcrypt from 'bcrypt'
import connectMongo from '../../../lib/connectDB'
import Users from '../../../models/user.models'

export default async function handler(req, res) {
    await connectMongo();

    const body = req.body
    const user = await Users.findOne({ email: body.email })

    if (user) {
        res.status(200).json({ message: 'Already registered!' })
        return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(body.password, salt)
    const newUser = new Users({
        username: body.username,
        email: body.email,
        password: hashPass,
        campus: body.campus,
        major: body.major
    })
    await newUser.save()
    res.status(200).json({ message: 'success' })
}
