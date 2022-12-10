import {useState} from "react"
import { deleteItems } from "../../backend/helper/items/items";

export default function DisplayTask({ taskID, description, username, createdDate, deadline, list_id }) {
    const [message, setMessage] = useState(null)

    return (
        <div className="">
            <div>{description}</div>
            {username.map((doc) => (
                <div key={doc}>
                    <div>{doc}</div>
                </div>
            ))}
            <div>{createdDate}</div>
            <div>{deadline}</div>

            <button onClick={(e) => deleteItems({
                description: description,
                username: username,
                createdDate: createdDate,
                deadline: deadline,
                list_id: list_id,
            }, e, setMessage, `/api/workspace/task/${taskID}`)}>
                Delete Task
            </button>
        </div>

    )
}