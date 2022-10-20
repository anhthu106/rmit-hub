import Information from "../../components/users/Information";
import {take} from "../../helper/users/users";

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
                <Information
                    id={info._id}
                    username={info.username}
                    email={info.email}
                    campus={info.campus}
                    major={info.major}
                />

            ))}
        </div>

    )
}