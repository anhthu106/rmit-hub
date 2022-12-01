import connectDB from "../../../backend/lib/connectDB";
import Posts from "../../../backend/models/post";
import User from "../../../backend/models/user";
import { StatusCodes } from "http-status-codes";

export default async function handler(req, res) {
    try {
        await connectDB()
        switch (req.method) {
            case "DELETE": {
                try {
                    const { id } = req.query;
                    const userName = req.body.author
                    await Posts.findByIdAndDelete(id);
                    const postID = await User.find({ username: userName }, "post_id");
                    const postArr = postID[0]["post_id"]

                    for (let i = 0; i < postArr.length; i++) {
                        if (postArr[i].toString() === id) {
                            postArr.splice(i, 1);
                        }
                    }

                    await User.findOneAndUpdate({ username: userName }, { post_id: postArr });
                    res.status(StatusCodes.OK).json({ message: "Deleted" });
                } catch (erorr) {
                    console.log(error);
                    return error
                }
            }

            case "PATCH": {
                const {
                    body: { content },
                    query: { id }
                } = req

                if (content === "") {
                    new Error.json({ message: "Please fill out the box" })
                }
                const post = await Posts.findByIdAndUpdate(
                    { _id: id }, req.body, { new: true, runValidators: true }
                )
                if (!post) {
                    new Error.json({ message: "Posts not found" })
                }
                return res.status(StatusCodes.OK).json({ message: "Your post updated" })
            }
        }
    } catch (error) {
        return error
    }

}