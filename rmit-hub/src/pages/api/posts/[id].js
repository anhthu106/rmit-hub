import connectMongo from "../../../backend/lib/connectDB";
import Posts from "../../../backend/models/post";
import { StatusCodes } from "http-status-codes";

export default async function handler(req, res) {
    try {
        await connectMongo()
        switch (req.method) {
            case "DELETE": {
                try {
                    const { id } = req.query;
                    await Posts.findByIdAndDelete(id);
                    res.status(StatusCodes.OK).json({ message: "Deleted" });
                } catch (e) {
                    console.log(e);
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
    } catch
    (error) {
        return error
    }

}