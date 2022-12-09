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

// COMPONENT
import EditProfileForm from "../../components/users/EditProfileForm";
import { Account } from "../../pageComponents/user/Account";


export async function getServerSideProps({ params }) {
    await connectDB();
    const majorData = await Major.find({}, "name");
    const majors = importRawData(majorData, ["_id"], null);

    let Info = {};
    let posts = [];
    if (mongoose.Types.ObjectId.isValid(params.id)) {
        const userData = await Users.findById(
            params.id,
            "_id username email campus major_id image"
        ).populate("major_id", "name -_id", Major);

        const postData = await Post.find({ userID: params.id }, 'courseID content createdAt userID image').populate('courseID', 'name -_id', Course).populate('userID', 'username _id image', Users).sort({ createdAt: -1 })


        const post = importRawData(postData, ['_id'], 'createdAt')

        posts = await Promise.all(
            post.map(async (doc) => {
                doc.userID._id = doc.userID._id.toString();
                return doc;
            })
        )

        if (userData !== null) {
            Info = {
                _id: userData._id.toString(),
                username: userData.username,
                email: userData.email,
                campus: userData.campus,
                major: userData.major_id.name,
                image: userData.image.imgURL
            };
        }
    }


    return {
        props: {
            Info,
            majorProps: majors,
            postProps: posts,
        },
    };
}

export default function Detail({ Info, majorProps, postProps }) {
    const { data: session } = useSession();
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
                            majorProps={majorProps}
                        />
                    }
                    postProps={postProps}
                    session={session}
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
        />
    );
}

Detail.auth = true;
