import CreateTeam from "../../components/team/createTeam";
import connectMongo from "../../backend/lib/connectDB";
import Course from "../../backend/models/course";

export async function getServerSideProps() {
    await connectMongo()
    const data = await Course.find({}, "name")

    const courses = data.map((doc) => {
        const course = doc.toObject();
        course._id = course._id.toString()
        return course
    })

    return { props: { courseProps: courses } }
}
const Team = ({courseProps}) => {
    return (
        <div>
           <CreateTeam courseProps={courseProps}/>
        </div>
    )
}

export default Team
