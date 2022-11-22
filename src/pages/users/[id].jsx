// BACKEND
import { useSession } from "next-auth/react";
import connectDB from "../../backend/lib/connectDB";
import importRawData from "../../backend/helper/data/data"
import mongoose from "mongoose";

// model 
import Users from "../../backend/models/user";
import Major from "../../backend/models/major";
import Post from "../../backend/models/post";
import Course from "../../backend/models/course"

// COMPONENT
import UserInformation from "../../components/users/UserInformation";
import EditProfileForm from "../../components/users/EditProfileForm";
import DisplayPost from "../../components/posts/DisplayPost";

export async function getServerSideProps({ params }) {
    await connectDB()
    const majorData = await Major.find({}, "name")
    const majors = importRawData(majorData)

    let Info = {}
    let posts = []
    if (mongoose.Types.ObjectId.isValid(params.id)) {
        const userData = await Users.findById(params.id, "_id username email campus major_id post_id")

        let UserInfo
        if (userData !== null) {
            const userMajor = await Major.findById(userData.major_id.toString(), "name")
            for (let i = 0; i < userData.post_id.length; i++) {
                const postData = await Post.findById(userData.post_id[i], "courseID currentDate content")
                const course = await Course.findById(
                    postData.courseID.toString(),
                    "name"
                ).lean();

                const postInfo = {
                    _id: postData._id.toString(),
                    userID: userData.username,
                    currentDate: postData.currentDate,
                    content: postData.content,
                    courseID: course["name"]
                }
                posts.push(postInfo)
            }

            UserInfo = {
                _id: userData._id.toString(),
                username: userData.username,
                email: userData.email,
                campus: userData.campus,
                major: userMajor.name
            }

        }
        Info = { ...UserInfo }
    }

    return {
        props: {
            Info,
            majorProps: majors,
            postProps: posts
        }
    }
}

export default function Detail({ Info, majorProps, postProps }) {
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
                <br />
                {postProps.map((post) => (
                    <div key={post._id}>
                        <DisplayPost
                            author={post.userID}
                            date={post.currentDate}
                            content={post.content}
                            course={post.courseID}
                            id={post._id}
                            sessionName={session.user._id}
                            username={Info._id}
                        />
                    </div>
                ))}
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
