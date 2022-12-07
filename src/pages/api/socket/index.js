import {Server} from "socket.io";
import connectDB from "../../../backend/lib/connectDB";

export default async function handler(req, res) {
    await connectDB()
    if (res.socket.server.io) {
        console.log("Socket is already running")
        const io = res.socket.server.io
        io.on("connection", socket => {
            socket.on("Task", (data) => {
                console.log(data)
                socket.broadcast.emit("MoveTask", data)

            })
        })
        console.log(io.engine.clientsCount)

    } else {
        console.log("Socket is initializing")
        const io = new Server(res.socket.server)
        console.log(io.engine.clientsCount)
        res.socket.server.io = io
    }


    res.end()
}