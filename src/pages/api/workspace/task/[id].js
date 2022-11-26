import connectDB from "../../../../backend/lib/connectDB";
import { StatusCodes } from "http-status-codes";
import Task from "../../../../backend/models/task";
import List from "../../../../backend/models/list"

export default async function handler(req, res) {
    try {
        await connectDB()
        switch (req.method) {
            case "DELETE": {
                try {
                    const { id } = req.query;
                    const listID = req.body.list_id;
                    const listData = await List.findById(listID, "task_id")

                    let taskArr = listData['task_id']

                    for (let i of taskArr) {
                        if (i.toString() == id.toString()) {
                            taskArr.splice(i, 1);
                        }
                    }

                    await List.findOneAndUpdate({ _id: listID }, { task_id: taskArr })
                    await Task.findByIdAndDelete(id);
                    res.status(StatusCodes.OK).json({ message: "Deleted" });

                } catch (e) {
                    console.log(e);
                }
            }
        }
    } catch (Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ Error })
    }

}