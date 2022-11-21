import { useState } from "react";
import { deleteItems } from "../../backend/helper/items/items";
import CreateTask from "./CreateTask"

export default function DisplayList({ title, listID }) {
    const [message, setMessage] = useState(null)
    return (
        <div>
            <div>----------------------</div>
            <div>{title}</div>
            <CreateTask listID={listID} />
            <button onClick={(e) => deleteItems({ title }, e, setMessage, `/api/workspace/list${id}`)}>
                Delete List
            </button>
        </div>

    )
}