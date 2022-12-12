import makeAnimated from "react-select/animated";
import {util} from "../../../utils/utils";
import {useEffect, useState} from "react";
import Select from "react-select";
import {io} from "socket.io-client";

let socket;

export default function Task({listID, usernameProps, task}) {
    const animated = makeAnimated();
    const personOption = util.username(usernameProps);

    const [description, setDescription] = useState(task.description);
    const [deadline, setDeadline] = useState(task.deadline);
    const [assignedPerson, setAssignedPerson] = useState(task.username);

    useEffect(() => {
        setDescription(task.description)
        setDeadline(task.deadline)
        setAssignedPerson(task.username)
    }, [task.description, task.deadline, task.username])

    const onKeyDown = (e) => {
        if (e.key === "Enter" || e.key === "Escape") {
            const data = {
                task, description, listID, deadline, assignedPerson,
            };

            socket = io();
            socket.emit("updateTask", data);
            e.preventDefault();
            // setShowModal(false);
        }
    }

    return (
        <form>
            <div>
                <label
                    htmlFor="description"
                    // className="block mb-2 text-2xl font-medium text-gray-900 "
                >
                    Description
                </label>
                <input
                    placeholder="Enter list description..."
                    type="text"
                    id="description"
                    name="description"
                    required
                    value={description}
                    onKeyDown={onKeyDown}
                    onChange={(e) => setDescription(e.target.value)}
                    // className="w-full text-lg text-gray-900 bg-white focus:ring-1 resize-none rounded-md border border-gray-300"
                />
            </div>
            <div>
                <label
                    htmlFor="deadline"
                    // className="block mb-2 text-2xl font-medium text-gray-900 "
                >
                    Deadline
                </label>
                <input
                    type="date"
                    id="deadline"
                    name="deadline"
                    required
                    value={deadline}
                    onKeyDown={onKeyDown}
                    onChange={(e) => setDeadline(e.target.value)}
                    // className="w-full text-lg text-gray-900 bg-white focus:ring-1 resize-none rounded-md border border-gray-300"
                />
            </div>
            <div>
                <label
                    htmlFor="assignedPerson"
                    // className="block mb-2 text-2xl font-medium text-gray-900 "
                >
                    Person In Charge
                </label>
                <Select
                    onChange={(assignedPerson) => setAssignedPerson(assignedPerson.label)}
                    components={animated}
                    options={personOption}
                    onKeyDown={onKeyDown}
                    placeholder={assignedPerson}
                />
            </div>

        </form>
    )
}