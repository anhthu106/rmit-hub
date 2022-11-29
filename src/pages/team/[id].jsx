// BACKEND
import { useState } from "react";
import { useSession } from "next-auth/react";
import connectDB from "../../backend/lib/connectDB";
import importRawData from "../../backend/helper/data/data";
import { deleteItems } from "../../backend/helper/items/items";

// model
import Course from "../../backend/models/course";
import Users from "../../backend/models/user";
import Teams from "../../backend/models/team";
import List from "../../backend/models/list";
import Task from "../../backend/models/task";

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
    const listData = await List.find({ team_id: params.id }, '_id title task_id team_id').populate('task_id', '_id description username createdDate deadline', Task)
    const list = importRawData(listData, ['_id', 'team_id'])

    const lists = await Promise.all(
        list.map(async (doc) => {
            doc.task_id.map(async (task) => {
                task._id = task._id.toString()
            })
            return doc;
        })
    )

    console.log(lists)
    const courses = importRawData(courseData, ['_id'])

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
                            listID={list._id}
                            usernameProps={userName}
                            taskProps={list}
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
                            taskProps={list}
                            listID={list._id}
                            usernameProps={userName}
                        />
                    </div>
                ))}
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