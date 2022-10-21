import Information from "../../components/users/Information";
import {take} from "../../helper/users/users";
import {useSession} from "next-auth/react";
import EditProfileForm from "../../components/users/EditProfileForm";
import {useEffect, useState} from "react";


export async function getStaticPaths() {
    /**
     * Create dynamic paths
     * @type {any}
     */
    const data = await take.AllUser()
    const paths = data.map((data) => ({
        params: {id: data._id}
    }))

    return {
        paths, fallback: false
    }
}


export const getStaticProps = async ({params}) => {
    /**
     * Fetch data to the page
     * @type {any}
     */
    const data = await take.UserByID(params.id)
    return {
        props: {Info: data}
    }
}

export default function Detail({Info}) {
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
            <div>Loading</div>
        )
    }


}