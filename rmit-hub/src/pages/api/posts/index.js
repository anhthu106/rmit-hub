import connectMongo from "../../../backend/lib/connectDB";
import Posts from "../../../backend/models/post";
import { StatusCodes } from "http-status-codes";

export default async function handler(req, res) {
    try {
        await connectMongo()
        switch (req.method) {
            case "POST": {
                const body = req.body
                req.post = {
                    date: body.date,
                    content: body.content,
                }
                await Posts.create(req.post)
                return res.status(StatusCodes.OK).json(post)
            }
            case "GET": {
                try {
                    const { id } = req.query
                    const post = await Posts.findById(id, "_id")
                    return res.status(StatusCodes.OK).json(post)
                } catch (e) {
                    console.log(e)
                }
            }
            case "DELETE": {
                try {
                    const id = req.params.id;
                    const post = await Posts.remove({ _id: id });
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