import connectMongo from "../../../backend/lib/connectDB";
import Posts from "../../../backend/models/post";
import { StatusCodes } from "http-status-codes";

export default async function handler(req, res) {
    try {
        await connectMongo()
        switch (req.method) {
            // create post
            case "POST": {
                await Posts.create(req.body)
                res.status(StatusCodes.OK).json(req.body)
            }

            // get all post
            case "GET": {
                try {
                    const post = await Posts.find({})
                    return res.status(StatusCodes.OK).json(post)
                } catch (e) {
                    console.log(e)
                }
            }

            // delete post
            case "DELETE": {
                try {
                    const id = req.params.id;
                    const post = await Posts.findByIdAndDelete({ _id: id });
                    res.send("Post deleted successfully");
                } catch (err) {
                    console.log(err);
                }
            }
        }
    } catch
    (error) {
        return error
    }

}