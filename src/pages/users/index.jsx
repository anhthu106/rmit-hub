// BACKEND
import { useState } from "react";
import Link from "next/link";
import connectDB from "../../backend/lib/connectDB";
import { searchUsername } from "../../backend/helper/items/items";

// model
import Users from "../../backend/models/user";
import Major from "../../backend/models/major";

// COMPONENT
import UserInformation from "../../components/users/UserInformation";
import Search from "../../components/Search/search";

// Fetch data form server
export async function getServerSideProps() {
    await connectDB()
    /* find all the data in our database */
    const data = await Users.find({}, "_id username email campus major_id")

    const users = await Promise.all(data.map(async (doc) => {
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
    return { props: { Info: users } }

}


export default function Profile({ Info }) {
    /**
     * Display all User
     */
    const [query, setQuery] = useState('');

    const filtered = searchUsername(query, Info)
    //Handling the input on our search bar
    const handleChange = (e) => {
        setQuery(e.target.value)
    }

    return (
        <div>
            <Search onchange={handleChange} />
            <h1>All User</h1>
            {filtered.map(info => (
                <div key={info._id}>
                    <Link href={`/users/${info._id}`}>{info._id}</Link>
                    <UserInformation
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