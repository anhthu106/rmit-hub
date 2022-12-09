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

                await sendColumn(team, socket)

            })

            socket.on("deleteList", async (data) => {
                socket.join("roomListDelete")

                const deleteList = await List.findByIdAndDelete(data);
                const team = await Teams.findByIdAndUpdate(deleteList.team_id, {$pull: {listID: deleteList._id}})
                await Task.deleteMany({_id: {$in: deleteList.task_id}})

                await sendColumn(team, socket)


            })

            socket.on("updateTask", async (data) => {
                socket.join("roomTaskUpdate")
                const taskValue = {
                    description: data.description,
                    list_id: data.listID,
                    username: data.assignedPerson,
                    deadline: data.deadline,
                }
                const task = await Task.create(taskValue)
                const list = await List.findByIdAndUpdate(taskValue.list_id.toString(),
                    {$push: {task_id: task._id}})


                const team = await Teams.findById(list.team_id.toString())

                await sendColumn(team, socket)

            })

            socket.on("deleteTask", async (data) => {
                socket.join("roomTaskDelete")


                const deleteTask = await Task.findByIdAndDelete(data);
                const list = await List.findByIdAndUpdate(deleteTask.list_id, {$pull: {task_id: deleteTask._id}})

                const team = await Teams.findById(list.team_id.toString())

                await sendColumn(team, socket)

            })


        })

        const sendColumn = async (team, socket) => {
            const listData = await List.find({team_id: team._id}, '_id title task_id team_id').populate('task_id', '_id description username createdDate deadline', Task)
            const list = importRawData(listData, ['_id', 'team_id'], null)

            const lists = list.map((doc) => {
                    doc.task_id.map((task) => {
                        task._id = task._id.toString()
                    })
                    return doc;
                }
            )

            socket.broadcast.emit("MoveList", lists)
        }
    }
    res.end()
}