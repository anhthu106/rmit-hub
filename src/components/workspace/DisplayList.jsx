import { useState } from "react";
import { deleteItems } from "../../backend/helper/items/items";
import CreateTask from "./CreateTask"
import DisplayTask from "./DisplayTask";

export default function DisplayList({ listID, usernameProps, taskProps }) {
    const [message, setMessage] = useState(null)
    return (
        <div>
            <div>----------------------</div>
            <div>{taskProps.title}</div>
            <CreateTask
                listID={listID}
                usernameProps={usernameProps}
            />

            <div>this is the list</div>
            {taskProps['taskProps'].map((task) => {
                <div key={task._id}>
                    <div>hellooooooooo</div>
                    <div>{task.description}</div>
                    {/* <DisplayTask
                        description={task.description}
                        username={task.username}
                        createdDate={task.createdDate}
                        deadline={task.deadline}
                    /> */}
                </div>

            })}

            <div>this is the end of the list</div>

            <button onClick={(e) => deleteItems({ title }, e, setMessage, `/api/workspace/list${id}`)}>
                Delete List
            </button>
        </div>

    )
}