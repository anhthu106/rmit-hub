import { useState } from "react";
import { addItems } from "../../backend/helper/Items/Items";

export default function CreateList({ teamID }) {

    const [description, setDescription] = useState()
    const [message, setMessage] = useState(null)

    const d = new Date()
    const currentDate = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate()
    return (
        <div>
            <form>
                <div>
                    <label htmlFor="description">Description</label>
                    <input
                        placeholder="Enter list description..."
                        type="text"
                        id="description"
                        name="description"
                        required
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                </div>
                <button onClick={(e) => addItems({ currentDate, description, teamID }, e, setMessage, "/api/workspace/list")}>
                    Add List
                </button>
            </form>
            <div>{message}</div>
        </div>

    )
}
