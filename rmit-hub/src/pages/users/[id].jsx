import Information from "../../components/users/Information";
import {useSession} from "next-auth/react";
import EditProfileForm from "../../components/users/EditProfileForm";
import connectDB from "../../backend/lib/connectDB";
import Users from "../../backend/models/user";
import Major from "../../backend/models/major";

//Fetch data
export async function getServerSideProps({params}) {
    await connectDB()
    const majorData = await Major.find({}, "name")
    const majors = majorData.map((doc) => {
        const major = doc.toObject()
        major._id = major._id.toString()
        return major
    })

    const userData = await Users.findById(params.id, "_id username email campus major_id")
    const userMajor = await Major.findById(userData.major_id.toString(), "name")

    const Info = {
        _id: userData._id.toString(),
        username: userData.username,
        email: userData.email,
        campus: userData.campus,
        major: userMajor.name
    }

    return {
        props: {
            Info,
            majorProps: majors
        }
    }
}

export default function Detail({Info, majorProps}) {
    const {data: session} = useSession()
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
                        majorProps={majorProps}
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
            <div>Please Sign in</div>
        )
    }


}