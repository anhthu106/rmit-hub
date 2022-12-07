import {Server} from "socket.io";
import connectDB from "../../../backend/lib/connectDB";
import List from "../../../backend/models/list";

export default async function handler(req, res) {
    await connectDB()
    if (res.socket.server.io) {
        console.log("Socket is already running")

    } else {
        console.log("Socket is initializing")
        res.socket.server.io = new Server(res.socket.server)
        const io = res.socket.server.io
        io.on("connection", socket => {
            socket.on("List", (lists) => {
                socket.broadcast.emit("MoveTask", lists)
            })

            socket.on("MongoUpdate", (update) => {
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