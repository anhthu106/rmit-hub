import makeAnimated from "react-select/animated";
import { useState } from "react";
import Select from "react-select";
import { util } from "../../utils/utils";
import { addItems } from "../../backend/helper/items/items";
import {io} from "socket.io-client";

let socket

export default function CreateTask({ listID, usernameProps }) {
    const animated = makeAnimated();
    const personOption = util.username(usernameProps)

    const [description, setDescription] = useState()
    const [deadline, setDeadline] = useState()
    const [assignedPerson, setAssignedPerson] = useState()
    const [message, setMessage] = useState(null)

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
                    <Select
                        onChange={(assignedPerson) => setAssignedPerson(assignedPerson.label)}
                        components={animated}
                        options={personOption}
                        placeholder={assignedPerson}
                    />
                </div>
                <button onClick={(e) =>{
                    const data = { description, listID, deadline, assignedPerson }

                    socket = io()
                    socket.emit("updateTask", data)
                    e.preventDefault()
                }}>

                    Add Task
                </button>
                <hr/>
            </form>
            <div>{message}</div>
        </div>

    )
}
