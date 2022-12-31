import connectDB from "../../../../backend/lib/connectDB";
import {StatusCodes} from "http-status-codes";
import Task from "../../../../backend/models/task";
import List from "../../../../backend/models/list";

export default async function handler(req, res) {
    try {
        await connectDB()
        switch (req.method) {
            case "DELETE": {
                try {
                    const {id} = req.query;

                    const deleteTask = await Task.findByIdAndDelete(id);
                    await List.findByIdAndUpdate(deleteTask.list_id, {$pull: {task_id: deleteTask._id}})

                    res.status(StatusCodes.OK).json({message: "Deleted"});

                } catch (e) {
                    return e;
                }
            }
        }
    } catch (Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({Error})
    }

}