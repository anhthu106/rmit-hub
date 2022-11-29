import connectDB from "../../../../backend/lib/connectDB";
import { StatusCodes } from "http-status-codes";
import Task from "../../../../backend/models/task";
import List from "../../../../backend/models/list";

export default async function handler(req, res) {
    try {
        await connectDB()
        switch (req.method) {
            // create post
            case "POST": {
                const taskValue = {
                    description: req.body.description,
                    list_id: req.body.listID,
                    username: req.body.assignedPerson,
                    deadline: req.body.deadline,
                }
                const task = await Task.create(taskValue)
                await List.findByIdAndUpdate(taskValue.list_id.toString(),
                    { $push: { task_id: task._id } })
                res.status(StatusCodes.CREATED).json({ message: "Task created" });
            }
        }
    } catch
    (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error })
    }

}