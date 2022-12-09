import connectDB from "../../../backend/lib/connectDB";
import Posts from "../../../backend/models/post";
import User from "../../../backend/models/user";
import Course from "../../../backend/models/course";
import cloudinary from "../../../backend/helper/config/cloudinary"

import { StatusCodes } from "http-status-codes";

export default async function handler(req, res) {
    try {
        await connectDB()
        switch (req.method) {
            case "DELETE": {
                try {
                    const { id } = req.query;
                    const userName = req.body.author
                    const post = await Posts.findById(id, "image");

                    await cloudinary.uploader.destroy(post.image.imgPublicID, {
                        folder: "posts_" + id,
                    })
                    await Posts.findByIdAndDelete(id)
                    const postID = await User.findOne({ username: userName }, "post_id");
                    const postArr = postID["post_id"]

                    for (let i = 0; i < postArr.length; i++) {
                        if (postArr[i].toString() === id) {
                            postArr.splice(i, 1);
                        }
                    }

                    await User.findOneAndUpdate({ username: userName }, { post_id: postArr });
                    res.status(StatusCodes.OK).json({ message: "Deleted" });
                } catch (error) {
                    console.log(error);
                    return error
                }
            }

            case "PATCH": {
                const { newCourse, newContent, newImage, messgae, uid, id } = req.body;
                const data = await Course.findOne({ name: newCourse }, "_id").lean()
                const courseId = data._id.toString()
                const image = await Posts.findById(id, "image")

                let updatedPost;
                if (newImage != null) {
                    const result = await cloudinary.uploader.upload(newImage, {
                        folder: "posts_" + uid,
                    })

                    updatedPost = {
                        userID: uid,
                        courseID: courseId,
                        content: newContent,
                        image: {
                            imgPublicID: result.public_id,
                            imgURL: result.secure_url
                        }
                    }
                } else {
                    updatedPost = {
                        userID: uid,
                        courseID: courseId,
                        content: newContent,
                        image: {
                            imgPublicID: image.image.imgPublicID,
                            imgURL: image.image.imgURL,
                        }
                    }
                }

                const post = await Posts.findByIdAndUpdate(
                    id, updatedPost, { new: true, runValidators: true }
                )
                if (!post) {
                    new Error.json({ message: "Post not found" })
                }

                return res.status(StatusCodes.OK).json({ message: "Your post updated" })
            }
        }
    } catch (error) {
        return error
    }

}