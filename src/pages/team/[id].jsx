import Course from "../../backend/models/course";
import { useSession } from "next-auth/react";
import connectDB from "../../backend/lib/connectDB";
import Teams from "../../backend/models/team";
import TeamInformation from "../../components/team/TeamInformation";
import Users from "../../backend/models/user";
import EditTeam from "../../components/team/EditTeam";
import importRawData from "../../backend/helper/data/data";
import { deleteItems, updateItems } from "../../backend/helper/Items/Items";
import { useState } from "react";
import Button from "../../components/button/Button";
import CreateList from "../../components/workspace/CreateList"
export async function getServerSideProps({ params }) {
    await connectDB()

    const courseData = await Course.find({}, "name")
    const teamData = await Teams.findById(params.id)
    const teamCourse = await Course.findById(teamData.courseID.toString(), "name")

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
            courseProps: courses
        }
    }
}

export default function TeamDetail({ test, TeamInfo, courseProps }) {
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