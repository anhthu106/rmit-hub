// BACKEND 
import { useState } from "react";
import { useSession } from "next-auth/react";
import connectDB from "../../backend/lib/connectDB";
import importRawData from "../../backend/helper/data/data";
import { deleteItems, updateItems } from "../../backend/helper/items/items";

// model
import Course from "../../backend/models/course";
import Users from "../../backend/models/user";
import Teams from "../../backend/models/team";
import List from "../../backend/models/list";
// import Task from "../../backend/models/task";

// COMPONENT
import TeamInformation from "../../components/team/TeamInformation";
import EditTeam from "../../components/team/EditTeam";
import Button from "../../components/button/Button";
import CreateList from "../../components/workspace/CreateList"
import DisplayList from "../../components/workspace/DisplayList"

export async function getServerSideProps({ params }) {
    await connectDB()

    const courseData = await Course.find({}, "name")
    const teamData = await Teams.findById(params.id)
    const teamCourse = await Course.findById(teamData.courseID.toString(), "name")
    const listData = await List.find({ team_id: params.id })
    // const taskData = await Task.find({}, "desccription user_id list_id createdDate deadline")
    // console.log('taskData', taskData)

    // console.log(listData)
    const lists = await Promise.all(
        listData.map(async (doc) => {
            const list = doc.toObject();
            list._id = list._id.toString();
            list.team_id = list.team_id.toString()

            for (let i = 0; i < list.task_id.length; i++) {
                list.task_id[i] = list.task_id[i].toString()
            }

            return list;
        })
    );

    // const tasks = await Promise.all(
    //     taskData.map(async (doc) => {
    //         const task = doc.toObject();
    //         task._id = task._id.toString();
    //         task.list_id = task.list_id.toString()
    //         await Promise.all(task.user_id.map(async (data) => {
    //             data = data.toString()
    //             const user = await Users.findById(data, "username").lean()
    //             return user["username"]
    //         }))


    //         return task;
    //     })
    // );

    const courses = importRawData(courseData)

    const userId = teamData.userID.map((data) => {
        return data.toString()
    })

    const userName = await Promise.all(teamData.userID.map(async (data) => {
        data = data.toString()
        const user = await Users.findById(data, "username").lean()
        return user["username"]
    }))

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
            TeamInfo,
            courseProps: courses,
            listProps: lists,
            // taskProps: tasks,
            userName: userName
        }
    }
}

export default function TeamDetail({ listProps, TeamInfo, courseProps, userName }) {
    const { data: session } = useSession()
    const id = session.user._id
    const [message, setMessage] = useState(null)
    if (id === TeamInfo.userId[0]) {
        return (
            <div>
                <TeamInformation
                    Description={TeamInfo.description}
                    Name={TeamInfo.name}
                    Member={TeamInfo.members}
                    CourseId={TeamInfo.courseName}
                    User={TeamInfo.user}
                />
                <EditTeam
                    courseProps={courseProps}
                    preCourse={TeamInfo.courseName}
                    preName={TeamInfo.name}
                    id={TeamInfo._id}
                    preDescription={TeamInfo.description}
                />
                <CreateList teamID={TeamInfo._id} />
                {listProps.map((list) => (
                    <div key={list._id}>
                        <DisplayList
                            title={list.title}
                            listID={list._id}
                            usernameProps={userName}
                        />
                    </div>
                ))}
            </div>
        )
    } else {
        return (

            <div>
                <TeamInformation
                    Description={TeamInfo.description}
                    Name={TeamInfo.name}
                    Member={TeamInfo.members}
                    CourseId={TeamInfo.courseName}
                    User={TeamInfo.user}
                />
                <CreateList teamID={TeamInfo._id} />
                {listProps.map((list) => (
                    <div key={list._id}>
                        <DisplayList
                            title={list.title}
                            listID={list._id}
                            usernameProps={userName}
                        />
                    </div>
                ))}
                <Button
                    fn={(e) => updateItems({ userId: id }, e, setMessage, `/api/team/${TeamInfo._id}`)}
                    options={"Join Team"}
                />
                <Button
                    fn={(e) => deleteItems({ userId: id }, e, setMessage, `/api/team/${TeamInfo._id}`)}
                    options={"Out Team"}
                />
                <div>{message}</div>
            </div>
        )
    }
}

TeamDetail.auth = true