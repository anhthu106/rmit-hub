import Information from "../../components/users/Information";
import Link from "next/link";
import connectDB from "../../backend/lib/connectDB";
import Users from "../../backend/models/user";
import Major from "../../backend/models/major";

// Fetch data form server
export async function getServerSideProps() {
    await connectDB()
    /* find all the data in our database */
    const data = await Users.find({}, "_id username email campus major_id")

    const users = await Promise.all(data.map(async (doc) => {// Promise all use for take an iterable of promises
        // Take the name of major base in ID
        const majorData = await Major.findById(doc.major_id.toString(), "name")

        return {
            _id: doc._id.toString(),
            username: doc.username,
            email: doc.email,
            campus: doc.campus,
            major: majorData.name
        }
    }))
    return {props: {Info: users}}

}


export default function Profile({Info}) {
    /**
     * Display all User
     */
    return (
        <div>
            <h1>All User</h1>
            {Info.map(info => (
                // eslint-disable-next-line react/jsx-key
                <div key={info._id}>
                    <Link href={`/users/${info._id}`}>{info._id}</Link>
                    <Information
                        username={info.username}
                        email={info.email}
                        campus={info.campus}
                        major={info.major}
                    />
                </div>
            ))}
        </div>

    )
}