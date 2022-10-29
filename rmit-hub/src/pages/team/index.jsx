import CreateTeam from "../../components/team/CreateTeam";
import connectMongo from "../../backend/lib/connectDB";
import Course from "../../backend/models/course";
import {useSession} from "next-auth/react";

export async function getServerSideProps() {
    await connectMongo()
    const data = await Course.find({}, "name")

    const courses = data.map((doc) => {
        const course = doc.toObject();
        course._id = course._id.toString()
        return course
    })

    return {props: {courseProps: courses}}
}

const Team = ({courseProps}) => {
    const {data: session, status} = useSession()
    if (status === "Loading") {
        return (<div>Loading</div>)
    } else if (status === "authenticated") {
        const id = session.user._id.toString()
        console.log(id)
        return (
            <div>
                <CreateTeam
                    courseProps={courseProps}
                    OwnerUser={id}
                />
            </div>
        )
    }
}

export default Team
