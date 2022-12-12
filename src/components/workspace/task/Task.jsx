import makeAnimated from "react-select/animated";
import {util} from "../../../utils/utils";
import {useState} from "react";
import Select from "react-select";
import {io} from "socket.io-client";

let socket;

export default function Task({listID, usernameProps}) {
    const animated = makeAnimated();
    const personOption = util.username(usernameProps);

    const [description, setDescription] = useState();
    const [deadline, setDeadline] = useState();
    const [assignedPerson, setAssignedPerson] = useState();

    return (<div>

        <form>
            <div>
                <div>
                    <div>
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
                                placeholder={assignedPerson}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="items-center gap-2 mt-3 sm:flex">
                <button
                    type="submit"
                    // className="w-full mt-2 p-2.5 flex-1 text-white bg-blue-700 rounded-md outline-none ring-offset-2 ring-blue-700 focus:ring-2"
                    onClick={(e) => {
                        const data = {
                            description, listID, deadline, assignedPerson,
                        };

                        socket = io();
                        socket.emit("updateTask", data);
                        e.preventDefault();
                        // setShowModal(false);
                    }}
                >
                    Add Task
                </button>
            </div>
        </form>
    </div>)
}