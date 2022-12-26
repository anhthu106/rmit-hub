import connectDB from "../../../backend/lib/connectDB";
import Posts from "../../../backend/models/post";
import User from "../../../backend/models/user";
import Course from "../../../backend/models/course";
import cloudinary from "../../../backend/helper/config/cloudinary"

import {StatusCodes} from "http-status-codes";
import Team from "../../../backend/models/team";

export default async function handler(req, res) {
    try {
        await connectDB()
        switch (req.method) {
            case "DELETE": {
                try {
                    const {id} = req.query;
                    const post = await Posts.findById(id, "image");

                    await cloudinary.uploader.destroy(post.image.imgPublicID, {
                        folder: "posts_" + id,
                    })
                    const deletePost = await Posts.findByIdAndDelete(id)

                    await User.findByIdAndUpdate(deletePost.userID, {$pull: {post_id: deletePost._id}});
                    await Team.findByIdAndUpdate(deletePost.teamID, {$pull: {postID: deletePost._id}})
                    res.status(StatusCodes.OK).json({message: "Deleted"});
                } catch (error) {
                    console.log(error);
                    return error
                }
            }

            case "PATCH": {
                const {newCourse, newContent, newImage, messgae, uid, id} = req.body;
                const data = await Course.findOne({name: newCourse}, "_id").lean()
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
                    id, updatedPost, {new: true, runValidators: true}
                )
                if (!post) {
                    new Error.json({message: "Post not found"})
                }

                return res.status(StatusCodes.OK).json({message: "Your post updated"})
            }
        }
    } catch (error) {
        return error
    }

}