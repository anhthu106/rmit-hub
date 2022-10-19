import {useRouter} from "next/dist/client/router";
import ErrorPage from "next/error";
import {StatusCodes} from "http-status-codes";
import {getProfileById, getUserId} from "../../helper/user/Profile";
import Information from "../../components/users/Information";

export default function Profile({profile}) {
    const router = useRouter()
    if (!router.isFallback && !profile.startingPosts?.id) {
        return <ErrorPage statusCode={StatusCodes.NOT_FOUND}/>
    }
    return (
        <div>
            <Information
                username={profile.startingPosts.username}
                email={profile.startingPosts.email}
                campus={profile.startingPosts.campus}
                major={profile.startingPosts.major}
            />
        </div>
    )
}

export async function getStaticPaths(){
    const user = await getUserId()
    console.log(user)
    return{
        paths: [{params: {id: "634e97fd9a8256325baae1de"}}],
        fallback:false
    }
}

export async function getStaticProps({params}){
    const data =  await getProfileById(params.id)
    return{
        props:{
            profile: {
                startingID: String(data._id),
                startingPosts: JSON.parse(JSON.stringify(data)),
            }
        }
    }
}
