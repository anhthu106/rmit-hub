import connectMongo from "../../../backend/lib/connectDB";
import Posts from "../../../backend/models/post";
import Course from "../../../backend/models/course";
import { StatusCodes } from "http-status-codes";

export default async function handler(req, res) {
    try {
        await connectMongo()
        switch (req.method) {
            // create post
            case "POST": {
                const data = await Course.findOne({ name: req.body.course }, "_id").lean()
                const courseId = data._id.toString()

                const postValue = {
                    userID: req.body.id,
                    courseID: courseId,
                    content: req.body.content,
                    currentDate: req.body.currentDate
                }
                console.log(postValue)

                await Posts.create(postValue)

                res.status(StatusCodes.CREATED).json({ message: "Post created" });
            }
        }
    } catch
    (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error })
    }

}