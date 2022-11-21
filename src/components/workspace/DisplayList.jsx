import { useState } from "react";
import { deleteItems } from "../../backend/helper/items/items";

export default function DisplayPost({ title }) {
    const [message, setMessage] = useState(null)
    return (
        <div>
            <div>{title}</div>
            <button onClick={(e) => deleteItems({ title }, e, setMessage, `/api/workspace/list${id}`)}>
                Delete List
            </button>
        </div>

    )
}