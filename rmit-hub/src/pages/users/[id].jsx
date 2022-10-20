import Information from "../../components/users/Information";
import {take} from "../../helper/users/users";


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
    return (
        <div>
            <Information
                id={Info._id}
                username={Info.username}
                email={Info.email}
                campus={Info.campus}
                major={Info.major}
            />
        </div>
    )
}