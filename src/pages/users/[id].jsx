import { useSession } from "next-auth/react";
import UserInformation from "../../components/users/UserInformation";
import EditProfileForm from "../../components/users/EditProfileForm";
import connectDB from "../../backend/lib/connectDB";
import importRawData from "../../backend/helper/data/data"
import Users from "../../backend/models/user";
import Major from "../../backend/models/major";

export async function getServerSideProps({ params }) {
    await connectDB()
    const majorData = await Major.find({}, "name")
    const majors = importRawData(majorData)

    let Info = {}
    let UserInfo
    
    const userData = await Users.findById(params.id, "_id username email campus major_id")
    console.log(userData)
    if (userData !== null) {
        const userMajor = await Major.findById(userData.major_id.toString(), "name")
        UserInfo = {
            _id: userData._id.toString(),
            username: userData.username,
            email: userData.email,
            campus: userData.campus,
            major: userMajor.name
        }

    }
    Info = { ...UserInfo }
    return {
        props: {
            Info,
            majorProps: majors
        }
    }
}

export default function Detail({ Info, majorProps }) {
    const { data: session } = useSession()
    if (session.user._id === Info._id) {
        return (
            //My account
            <div>
                <UserInformation
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
            <UserInformation
                username={Info.username}
                email={Info.email}
                campus={Info.campus}
                major={Info.major}
            />
        </div>
    )
}

Detail.auth = true
