// BACKEND
import { useSession } from "next-auth/react";
import connectDB from "../../backend/lib/connectDB";
import importRawData from "../../backend/helper/data/data"
import mongoose from "mongoose";

// model 
import Users from "../../backend/models/user";
import Major from "../../backend/models/major";
import Post from "../../backend/models/post"
import Course from "../../backend/models/course";

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
        const userData = await Users.findById(params.id, "_id username email campus major_id").populate('major_id', 'name -_id', Major)
        const postData = await Post.find({ userID: params.id }, 'courseID content currentDate').populate('courseID', 'name -_id', Course)

        posts = importRawData(postData)
        if (userData !== null) {
            Info = {
                _id: userData._id.toString(),
                username: userData.username,
                email: userData.email,
                campus: userData.campus,
                major: userData.major_id.name
            }
        }
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
                            author={Info.username}
                            date={post.currentDate}
                            content={post.content}
                            course={post.courseID.name}
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
            <br />
            {postProps.map((post) => (
                <div key={post._id}>
                    <DisplayPost
                        author={Info.username}
                        date={post.currentDate}
                        content={post.content}
                        course={post.courseID.name}
                        id={post._id}
                        sessionName={session.user._id}
                        username={Info._id}
                    />
                </div>
            ))}
        </div>
    )
}

Detail.auth = true
