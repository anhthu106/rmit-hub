import { useState } from "react";
import { addItems } from "../../backend/helper/items/items";

export default function CreateList({ teamID }) {

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
                <button onClick={(e) => addItems({ title, teamID }, e, setMessage, "/api/workspace/list")}>
                    Add List
                </button>
            </form>
            <div>{message}</div>
        </div>

    )
}
