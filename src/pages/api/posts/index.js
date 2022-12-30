import connectDB from "../../../backend/lib/connectDB";
import Posts from "../../../backend/models/post";
import Course from "../../../backend/models/course";
import User from "../../../backend/models/user";
import { StatusCodes } from "http-status-codes";

import cloudinary from "../../../backend/helper/config/cloudinary";
import Team from "../../../backend/models/team";

export default async function handler(req, res) {
    try {
        await connectDB()
        switch (req.method) {
            // create post
            case "POST": {
                const { content, course, message, image, id, teamID } = req.body;
                const result = await cloudinary.uploader.upload(image, {
                    folder: "posts_" + id,
                })

                const data = await Course.findOne({ name: course }, "_id").lean()
                const courseId = data._id.toString()
                const postValue = {
                    userID: id,
                    courseID: courseId,
                    content: content,
                    image: {
                        imgPublicID: result.public_id,
                        imgURL: result.secure_url
                    },
                    teamID: teamID
                }

                const post = await Posts.create(postValue)
                const uid = post.userID
                await User.findByIdAndUpdate(uid, {
                    $push: {
                        post_id: post._id.toString(),
                    }
                })

                await Team.findByIdAndUpdate(teamID, {
                    $push: {
                        postID: post._id.toString()
                    }
                })

                res.status(StatusCodes.CREATED).json({ message: "Post created" });
            }
        }
    } catch (error) {
        console.log(error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error })
    }

}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '4mb',
        },
    },
}