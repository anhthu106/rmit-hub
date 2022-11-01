//Fetch data
import Course from "../../backend/models/course";
import {useSession} from "next-auth/react";
import connectDB from "../../backend/lib/connectDB";
import Teams from "../../backend/models/team";
import TeamInformation from "../../components/team/TeamInformation";
import Users from "../../backend/models/user";
import EditTeam from "../../components/team/EditTeam";
import importRawData from "../../backend/helper/Data/data";
import {deleteItems, updateItems} from "../../backend/helper/Items/Items";
import {useState} from "react";
import Button from "../../components/button/Button";

export async function getServerSideProps({params}) {
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

export default function TeamDetail({TeamInfo, courseProps}) {
    const {data: session} = useSession()
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

                <Button
                    fn={(e) => updateItems({userId: id}, e, setMessage, `/api/team/${TeamInfo._id}`)}
                    options={"Joins"}
                />
                <Button
                    fn={(e) => deleteItems({userId: id}, e, setMessage, `/api/team/${TeamInfo._id}`)}
                    options={"Delete"}
                />
                <div>{message}</div>
            </div>
        )
    }
}

TeamDetail.auth = true