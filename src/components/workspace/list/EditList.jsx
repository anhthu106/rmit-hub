import {useEffect, useState} from "react";
import {io} from "socket.io-client";

let socket

export default function EditList({listTile, listId}) {
    const [title, setTitle] = useState(listTile);

    useEffect(() => {
        setTitle(listTile)
    }, [listTile])


    const onKeyDown = (e) => {
        if (e.key === "Enter" || e.key === "Escape") {
            const data = {title, listId}

            socket = io()
            socket.emit("editList", data)

            e.preventDefault()
        }
    }
    return (
        <div className="text-lg font-semibold mb-7">
            <form>
                <div>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        onKeyDown={onKeyDown}
                    />
                </div>
            </form>
        </div>
    )
}