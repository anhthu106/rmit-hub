import Information from "../../components/users/Information";
import {take} from "../../helper/users/users";
import Link from "next/link";

export const getStaticProps = async () => {
    const data = await take.AllUser()
    return {
        props: {Info: data}
    }
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