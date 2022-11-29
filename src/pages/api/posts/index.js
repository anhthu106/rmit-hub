import connectDB from "../../../backend/lib/connectDB";
import Posts from "../../../backend/models/post";
import Course from "../../../backend/models/course";
import User from "../../../backend/models/user";
import { StatusCodes } from "http-status-codes";

export default async function handler(req, res) {
    try {
        await connectDB()
        switch (req.method) {
            // create post
            case "POST": {
                const data = await Course.findOne({ name: req.body.course }, "_id").lean()
                const courseId = data._id.toString()

                console.log(req.body)
                const postValue = {
                    userID: req.body.id,
                    courseID: courseId,
                    content: req.body.content,
                }

                const post = await Posts.create(postValue)
                const id = post.userID
                await User.findByIdAndUpdate(id, {
                    $push: {
                        post_id: post._id.toString(),
                    }
                })

                res.status(StatusCodes.CREATED).json({ message: "Post created" });
            }
        }
    } catch
    (error) {
        console.log(error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error })
    }

}