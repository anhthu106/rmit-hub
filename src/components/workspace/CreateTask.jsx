import { useState } from "react";
import { addItems } from "../../backend/helper/items/items";

export default function CreateTask({ listID }) {

    const [description, setDescription] = useState()
    const [deadline, setDeadline] = useState()
    const [assignedPerson, setAssignedPerson] = useState()

    const [message, setMessage] = useState(null)

    const d = new Date()
    const createdDate = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate()
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
                <div>
                    <label htmlFor="deadline">Deadline</label>
                    <input
                        placeholder="Enter deadline..."
                        type="text"
                        id="deadline"
                        name="deadline"
                        required
                        value={deadline}
                        onChange={e => setDeadline(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="assignedPerson">Person In Charge</label>
                    <input
                        placeholder="Enter person in charge..."
                        type="text"
                        id="assignedPerson"
                        name="assignedPerson"
                        value={assignedPerson}
                        onChange={e => setAssignedPerson(e.target.value)}
                    />
                </div>
                <button onClick={(e) => addItems({ createdDate, description, listID, deadline, assignedPerson }, e, setMessage, "/api/workspace/list")}>
                    Add Task
                </button>
                <div>-----------------------</div>
            </form>
            <div>{message}</div>
        </div>

    )
}
