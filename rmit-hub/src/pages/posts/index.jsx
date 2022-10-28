import connectDB from "../../backend/lib/connectDB";
import Posts from "../../backend/models/posts";

//Fetch data form server
export async function getServerSideProps() {
    await connectDB()
    /* find all the data in our database */
    const data = await Posts.find({}, "_id username email campus major")
    const posts = data.map((doc) => {
        const post = doc.toObject()
        post._id = post._id.toString()
        return post
    })

    return { props: { Post: posts } }
}


export default function AllPost({ Post }) {
    /**
     * Display all User
     */
    return (
        <div>
            <h1>All User</h1>
            {Post.map(post => (
                // eslint-disable-next-line react/jsx-key
                <div key={post._id}>
                    <Information
                        username={info.username}
                        email={info.email}
                        campus={info.campus}
                        major={info.major}
                    />
                </div>
            ))}
        </div>

    )
}