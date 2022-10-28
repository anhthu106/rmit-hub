import SignUp from "../../components/auth/SignUp"
import connectDB from "../../backend/lib/connectDB";
import Major from "../../backend/models/major";

export async function getServerSideProps() {
    await connectDB()
    /* find all the data in our database */
    const data = await Major.find({}, "name")
    const majors = data.map((doc) => {
        const major = doc.toObject()
        major._id = major._id.toString()
        return major
    })

    return {props: {majorProps: majors}}
}
const signup = ({majorProps}) => {
    return (
        <div>
           <SignUp majorProps={majorProps}/>
        </div>
    )
}

export default signup
