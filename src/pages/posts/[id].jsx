import { useSession } from "next-auth/react";
import connectDB from "../../backend/lib/connectDB";
import User from "../../backend/models/user";
import Post from "../../backend/models/post"
import Course from "../../backend/models/course"
import DisplayPost from "../../components/posts/DisplayPost"

export async function getServerSideProps({ params }) {
    await connectDB()

    const postData = await Post.find({})
    let obj = {}

    const posts = await Promise.all(postData.map(async (doc) => {
        const post = doc.toObject()

        if (post.courseID.toString() === params.id) {
            post._id = post._id.toString()
            post.userID = post.userID.toString()

            const course = await Course.findById(post.courseID.toString(), "name").lean()
            post.courseID = course["name"]

            const user = await User.findById(post.userID.toString(), "username").lean()
            post.userID = user["username"]
            console.log("adfsa", post)
            if (Object.keys(post).length !== 0) {
                obj = { ...post }
            }
        }
        return obj
    }))
    console.log(posts)
    return {
        props: {
            postProps: posts,
        }
    }
}

export default function Detail({ postProps }) {
    const { data: session } = useSession()
    if (session && postProps != {}) {
        return (
            <>
                {
                    postProps.map((post) => (
                        <div key={post._id}>
                            <DisplayPost
                                author={post.userID}
                                date={post.currentDate}
                                content={post.content}
                                course={post.courseID}
                                id={post._id}
                            />
                        </div>
                    ))
                }
            </>
        )
    } else {
        return
        <>
            dfsf
        </>
    }
}

Detail.auth = true