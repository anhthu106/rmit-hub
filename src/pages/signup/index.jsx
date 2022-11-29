// BACKEND 
import connectDB from "../../backend/lib/connectDB";
import importRawData from "../../backend/helper/data/data";

// model
import Major from "../../backend/models/major";

// COMPONENT
import SignUp from "../../pageComponents/auth/SignUp"

export async function getServerSideProps() {
    await connectDB()
    /* find all the data in our database */
    const majorData = await Major.find({}, "name")
    const majors = importRawData(majorData, ['_id'], null)

    return { props: { majorProps: majors } }
}

export default function signup({ majorProps }) {
    return (
        <div>
            <SignUp majorProps={majorProps} />
        </div>
    )
}

signup.authed = true