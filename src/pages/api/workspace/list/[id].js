import connectDB from "../../../../backend/lib/connectDB";
import { StatusCodes } from "http-status-codes";
import List from "../../../../backend/models/list";
import Teams from "../../../../backend/models/team";
import Task from "../../../../backend/models/task";

export default async function handler(req, res) {
    try {
        await connectDB()
        switch (req.method) {
            case "DELETE": {
                try {
                    const { id } = req.query;
                    const teamID = req.body.teamID
                    await List.findByIdAndDelete(id);
                    const teamObj = await Teams.findById(teamID, "listID")


                    let listArr = teamObj['listID']
                    for (let i of listArr) {
                        if (i.toString() == id.toString()) {
                            listArr.splice(i, 1)
                        }
                    }

                    let taskArr = req.body.taskID
                    for (let i of taskArr) {
                        await Task.findByIdAndDelete(i)
                    }

                    await Teams.findOneAndUpdate({ _id: teamID }, { listID: listArr })
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