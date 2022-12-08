import {Server} from "socket.io";
import List from "../../../backend/models/list";
import Lists from "../../../backend/models/list";
import Teams from "../../../backend/models/team";
import Task from "../../../backend/models/task";
import importRawData from "../../../backend/helper/data/data";

export default async function handler(req, res) {
    // Check socket exists
    if (res.socket.server.io) {
        console.log("Socket is already running")

    } else {
        console.log("Socket is initializing")
        // Create new socket
        res.socket.server.io = new Server(res.socket.server)

        const io = res.socket.server.io

        // When socket connected
        io.on("connection", socket => {
            // List in roomList
            socket.on("List", (lists) => {
                socket.join("roomList")
                socket.broadcast.emit("MoveList", lists)
            })

            // MongoUpdate in roomUpdate
            socket.on("MongoUpdate", (update) => {
                socket.join("roomUpdate")
                update.map(async (doc) => {
                    await List.findByIdAndUpdate(doc._id, {
                        "$set": {
                            task_id: doc.task_id
                        }
                    })
                })
            })

            socket.on("updateList", async (data) => {
                socket.join("roomListUpdate")

                const listValue = {
                    title: data.title,
                    team_id: data.teamID,
                }

                const list = await Lists.create(listValue)

                const team = await Teams.findByIdAndUpdate(listValue.team_id.toString(),
                    {$push: {listID: list._id}})

                const listData1 = await List.find({team_id: team._id}, '_id title task_id team_id').populate('task_id', '_id description username createdDate deadline', Task)
                const list1 = importRawData(listData1, ['_id', 'team_id'], null)

                const lists1 = list1.map((doc) => {
                        doc.task_id.map((task) => {
                            task._id = task._id.toString()
                        })
                        return doc;
                    }
                )
                socket.broadcast.emit("MoveList", lists1)
            })
        })
    }
    res.end()
}