import {useState} from "react";
import {deleteItems} from "../../backend/helper/items/items";
import CreateTask from "./CreateTask"
import DisplayTask from "./DisplayTask";

export default function DisplayList({listID, usernameProps, taskProps}) {
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
            <div>
                {taskProps.task_id.map((doc) => (
                        <div key={doc._id}>
                            <DisplayTask
                                username={doc.username}
                                description={doc.description}
                                createdDate={doc.createdDate}
                                deadline={doc.deadline}
                                list_id={listID}
                                taskID = {doc._id}
                            />
                        </div>
                    )
                )}
            </div>

            <div>this is the end of the list</div>

            <button onClick={(e) => deleteItems({
                title: title,
                teamID: teamId,
                taskID: taskId
            }, e, setMessage, `/api/workspace/list/${listID}`)}>
                Delete List
            </button>
        </div>

    )
}