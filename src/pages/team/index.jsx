// BACKEND
import connectMongo from "../../backend/lib/connectDB";
import { useSession } from "next-auth/react";
import Link from "next/link";
import importRawData from "../../backend/helper/data/data";

// model
import Teams from "../../backend/models/team";
import Users from "../../backend/models/user";
import Course from "../../backend/models/course";

// COMPONENT
import CreateTeam from "../../components/team/CreateTeam";
import TeamInformation from "../../components/team/TeamInformation";


export async function getServerSideProps() {
    await connectMongo()

    const courseData = await Course.find({}, "name")
    const teamData = await Teams.find({})
    const teams = await Promise.all(teamData.map(async (doc) => {
        const team = doc.toObject()
        team._id = team._id.toString()

        team.userID = await Promise.all(team.userID.map(async (id) => {
            id = id.toString()
            const user = await Users.findById(id, "username").lean()
            return user["username"]
        }))

        team.listID = await Promise.all(team.listID.map(async (id) => {
            id = id.toString()
            return id
        }))

        const course = await Course.findById(team.courseID.toString(), "name").lean()
        team.courseID = course["name"]

        return team
    }))

    const courses = importRawData(courseData, ['_id'], null)

    return {
        props: {
            courseProps: courses,
            teamProps: teams
        }
    }
}

export default function Team({ courseProps, teamProps }) {
    const { data: session, status } = useSession()
    if (status === "Loading") {
        return (
            <div>Loading</div>
        )
    } else if (status === "authenticated") {
        const id = session.user._id.toString()
        return (
            <div>
                <CreateTeam
                    courseProps={courseProps}
                    OwnerUser={id}
                />
                {teamProps.map((team) => (
                    <div key={team._id}>
                        <Link href={`/team/${team._id}`}>{team._id}</Link>
                        <TeamInformation
                            User={team.userID}
                            CourseId={team.courseID}
                            Member={team.Member}
                            Name={team.name}
                            Description={team.Description}
                        />
                    </div>
                ))}
            </div>
        )
    }
}

Team.auth = true;