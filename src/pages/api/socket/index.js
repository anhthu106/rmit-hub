import {Server} from "socket.io";
import connectDB from "../../../backend/lib/connectDB";
import List from "../../../backend/models/list";

export default async function handler(req, res) {
    await connectDB()

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
                        "$set" : {
                            task_id: doc.task_id
                        }
                    })
                })
            })
        })
    }
    res.end()
}