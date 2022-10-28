import Information from "../../components/users/Information";
import { useSession } from "next-auth/react";
import EditProfileForm from "../../components/users/EditProfileForm";
import connectDB from "../../backend/lib/connectDB";
import Users from "../../backend/models/user";

//Fetch data
export async function getServerSideProps({ params }) {
    await connectDB()
    const Info = await Users.findById(params.id, "_id username email campus major_id").lean()
    Info._id = Info._id.toString()
    return { props: { Info } }
}

export default function Detail({ Info }) {
    const { data: session } = useSession()
    if (session) {
        if (session.user._id === Info._id) {
            return (
                //My account
                <div>
                    <Information
                        username={Info.username}
                        email={Info.email}
                        campus={Info.campus}
                        major={Info.major}
                    />
                    <EditProfileForm
                        id={Info._id}
                        PreCampus={Info.campus}
                        PreMajor={Info.major}
                        PreUsername={Info.username}
                    />
                </div>
            )
        }
        return (
            //Normal account
            <div>
                <Information
                    username={Info.username}
                    email={Info.email}
                    campus={Info.campus}
                    major={Info.major}
                />
            </div>
        )
    } else {
        return (
            <div>Loading</div>
        )
    }


}