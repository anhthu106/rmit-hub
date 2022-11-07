import SignUp from "../../components/auth/SignUp"
import connectDB from "../../backend/lib/connectDB";
import Major from "../../backend/models/major";
import importRawData from "../../backend/helper/data/data";

export async function getServerSideProps() {
    await connectDB()
    /* find all the data in our database */
    const majorData = await Major.find({}, "name")
    const majors = importRawData(majorData)

    return { props: { majorProps: majors } }
}
const signup = ({ majorProps }) => {
    return (
        <div>
            <SignUp majorProps={majorProps} />
        </div>
    )
}

export default signup
