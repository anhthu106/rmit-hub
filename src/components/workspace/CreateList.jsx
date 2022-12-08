import {useState} from "react";
import {io} from "socket.io-client";

let socket
export default function CreateList({teamID}) {

    const [title, setTitle] = useState()
    const [message, setMessage] = useState(null)

    return (
        <div>
            <form>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        placeholder="Enter list title..."
                        type="text"
                        id="title"
                        name="title"
                        required
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <button onClick={(e) => {
                    const data = {title, teamID}

                    socket = io()
                    socket.emit("updateList", data)

                    e.preventDefault()
                }}>
                    Add List
                </button>
            </form>
            <div>{message}</div>
        </div>

    )
}
