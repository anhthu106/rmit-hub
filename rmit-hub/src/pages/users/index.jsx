import Information from "../../components/users/Information";
import Link from "next/link";
import connectDB from "../../lib/connectDB";


//Fetch data form server
export async function getServerSideProps() {
    await connectDB()
    /* find all the data in our database */
    const data = await Users.find({}, "_id username email campus major")
    const users = data.map((doc) => {
        const user = doc.toObject()
        user._id = user._id.toString()
        return user
    })

    return { props: { Info: users } }
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