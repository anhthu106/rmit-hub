// BACKEND
import { useSession } from "next-auth/react";
import connectDB from "../../backend/lib/connectDB";
import importRawData from "../../backend/helper/data/data";
import mongoose from "mongoose";

// model
import Users from "../../backend/models/user";
import Major from "../../backend/models/major";
import Post from "../../backend/models/post";
import Course from "../../backend/models/course";
import Teams from "../../backend/models/team";
import dynamic from "next/dynamic";



// COMPONENT
const EditProfileForm = dynamic(() => import("../../components/users/EditProfileForm"));
const Account = dynamic(() => import("../../pageComponents/user/Account"));
const CreatePost = dynamic(() => import("../../components/posts/CreatePost"))
const NotFoundPage = dynamic(() => import("../../components/error/NotFoundPage"));

export async function getServerSideProps({ params }) {
    await connectDB();
    const majorData = await Major.find({}, "name");
    const majors = importRawData(majorData, ["_id"], null);

    const data = await Course.find({}, "name");
    const courses = importRawData(data, ['_id'], null)

    let Info = {};
    let userData = {};
    let postData = {};
    let posts = {};

    if (mongoose.Types.ObjectId.isValid(params.id)) {
        userData = await Users.findById(
            params.id,
            "_id username email campus major_id team_id image"
        ).populate("major_id", "name -_id", Major).populate("team_id", "name ", Teams);
        postData = await Post.find({ userID: params.id }, 'courseID content updatedAt userID image').populate('courseID', 'name -_id', Course).populate('userID', 'username _id image', Users).sort({ updatedAt: -1 })
        const post = importRawData(postData, ['_id'], 'updatedAt')

        posts = await Promise.all(
            post.map(async (doc) => {
                doc.userID._id = doc.userID._id.toString();
                return doc;
            })
        )
        if (userData !== null) {
            const team = userData.team_id.map((data) => {
                data = data.toObject();
                data._id = data._id.toString();
                return data;
            })


            Info = {
                _id: userData._id.toString(),
                username: userData.username,
                email: userData.email,
                campus: userData.campus,
                major: userData.major_id.name,
                team: team,
                image: userData.image.imgURL
            };

        }
    }


    return {
        props: {
            Info,
            majorProps: majors,
            postProps: posts,
            courseProps: courses,
        },
    };
}

export default function Detail({ Info, majorProps, postProps, courseProps }) {
    const { data: session } = useSession();
    if (Object.keys(Info).length == 0) {
        return (<NotFoundPage />);
    }
    if (session.user._id === Info._id) {
        return (
            <>
                <Account
                    Info={Info}
                    tag={
                        <EditProfileForm
                            id={Info._id}
                            PreCampus={Info.campus}
                            PreMajor={Info.major}
                            PreUsername={Info.username}
                            PreImage={Info.image}
                            majorProps={majorProps}
                        />
                    }
                    postProps={postProps}
                    session={session}
                    courseProps={courseProps}
                    createPost={<CreatePost
                        courseProps={courseProps}
                        id={session.user._id}
                        Info={session}
                    />}
                />
            </>
        );
    }
    return (
        //Normal account
        <Account
            Info={Info}
            tag={
                <></>
            }
            postProps={postProps}
            session={session}
            createPost={""}
        />
    );
}

Detail.auth = true;
