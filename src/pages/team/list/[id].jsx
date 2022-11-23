// BACKEND 
import connectDB from "../../backend/lib/connectDB";


// model
import Users from "../../backend/models/user";
import Teams from "../../backend/models/team";
import List from "../../backend/models/list";
import Task from "../../backend/models/task";

// COMPONENT
import DisplayTask from "../../../components/workspace/DisplayTask"

export async function getServerSideProps({ params }) {
    await connectDB()

    const teamData = await Teams.findById(params.id)
    const listData = await List.find({ team_id: params.id })
    const taskData = await Task.find({})

    const tasks = await Promise.all(
        taskData.map(async (doc) => {
            const task = doc.toObject();
            task._id = task._id.toString();
            task.list_id = task.list_id.toString()
            await Promise.all(task.user_id.map(async (data) => {
                data = data.toString()
                const user = await Users.findById(data, "username").lean()
                return user["username"]
            }))
            return task;
        })
    );

    const TeamInfo = {
        _id: teamData._id.toString(),
        name: teamData.name,
        courseName: teamCourse.name,
        description: teamData.Description,
        members: teamData.Member,
        userId: userId,
        user: userName
    }

    return {
        props: {
            taskProps: tasks,
        }
    }
}

export default function TeamDetail({ taskProps }) {
    return (
        <div>
            {taskProps.map((task) => {
                <div key={task._id}>
                    <DisplayTask
                        description={task.description}
                        username={task.username}
                        createdDate={task.createdDate}
                        deadline={task.deadline}
                    />
                </div>
            })
            }
        </div>
    )

}
}
