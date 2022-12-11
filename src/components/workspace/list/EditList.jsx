import {useState} from "react";
import {io} from "socket.io-client";

let socket

export default function EditList({listTile, listId}) {
    const [title, setTitle] = useState(listTile);
    return (
        <div>
            <form>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        placeholder={listTile}
                        type="text"
                        id="title"
                        name="title"
                        required
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <button onClick={(e) => {
                    const data = {title, listId}

                    socket = io()
                    socket.emit("editList", data)

                    e.preventDefault()
                }}>
                    Edit List
                </button>
            </form>
        </div>
    )
}