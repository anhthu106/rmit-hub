import connectDB from "../../../../backend/lib/connectDB";
import {StatusCodes} from "http-status-codes";
import List from "../../../../backend/models/list";
import Teams from "../../../../backend/models/team";
import Task from "../../../../backend/models/task";

export default async function handler(req, res) {
    try {
        await connectDB()
        switch (req.method) {
            case "DELETE": {
                try {
                    const {id} = req.query;
                    const teamID = req.body.teamID
                    const deleteList = await List.findByIdAndDelete(id);
                    await Teams.findByIdAndUpdate(deleteList.team_id, {$pull: {listID: deleteList._id}})
                    await Task.deleteMany({_id: {$in: deleteList.task_id}})
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