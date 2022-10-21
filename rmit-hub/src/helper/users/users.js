import {fetchData} from "../fetch-data";

async function AllUser() {
    /**
     * Get All user in database
     * @type {Response}
     */
    const res = await fetchData.get(`${process.env.DOMAIN}/api/users/`)
    return await res.json()
}

async function UserByID(id) {
    /**
     * Get User specific user by ID
     * @type {Response}
     */
    const res = await fetchData.get(`${process.env.DOMAIN}/api/users/${id}`)
    return await res.json()
}

async function UpdateUserInformation(body,id, e, setMessage){
        e.preventDefault()
        const res = await fetchData.patch(`/api/users/${id}`, body)
        let data = await res.json()
        if(data.message){
            console.log(data.message)
            await setMessage(data.message)
        }
}

// eslint-disable-next-line import/no-anonymous-default-export
export const take = {
   AllUser, UserByID, UpdateUserInformation
}