// BACKEND
import { useSession } from "next-auth/react";
import connectMongo from "../backend/lib/connectDB";
import importRawData from "../backend/helper/data/data";
// model
import Course from "../backend/models/course";
import Post from "../backend/models/post";
import Users from "../backend/models/user";

import Homepage from "../pageComponents/homepage/Homepage";

export async function getServerSideProps() {
    await connectMongo();
    const data = await Course.find({}, "name");
    const courses = importRawData(data, ['_id'], null)

    const postData = await Post.find({}, 'courseID content updatedAt userID image').populate('courseID', 'name -_id', Course).populate('userID', 'username _id image', Users).sort({ updatedAt: -1 })


    const post = importRawData(postData, ['_id'], 'updatedAt')

    const posts = await Promise.all(
        post.map(async (doc) => {
            doc.userID._id = doc.userID._id.toString();
            return doc;
        })
    )

    return {
        props: {
            courseProps: courses,
            postProps: posts,
        },
    };
}

export default function Home({ courseProps, postProps }) {
    const { data: session } = useSession();
    if (session) {
        return (
            <Homepage
                courseProps={courseProps}
                postProps={postProps}
                session={session}
                Info = {session}
            />
        )
    }
}

Home.auth = true
