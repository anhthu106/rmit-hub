import { useState } from "react";
import { deleteItems } from "../../backend/helper/items/items";
import CreateTask from "./CreateTask"
import DisplayTask from "./DisplayTask";

export default function DisplayList({ listID, usernameProps, taskProps }) {
    const [message, setMessage] = useState(null)
    let title = taskProps.title
    let teamId = taskProps.team_id
    let taskId = taskProps.task_id

    return (
        <div>
            <div>----------------------</div>
            <div>{title}</div>
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

            <button onClick={(e) => deleteItems({ title: title, teamID: teamId, taskID: taskId }, e, setMessage, `/api/workspace/list/${listID}`)}>
                Delete List
            </button>
        </div>

    )
}