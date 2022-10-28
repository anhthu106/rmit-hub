import {fetchData} from "../fetchData/fetchData";

async function UpdateUserInformation(body, id, e, setMessage) {
    e.preventDefault()
    const res = await fetchData.patch(`/api/users/${id}`, body)
    let data = await res.json()
    if (data.message) {
        console.log(data.message)
        await setMessage(data.message)
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export const user = {
    UpdateUserInformation
}