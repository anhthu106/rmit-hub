import { fetchData } from "../fetchData/fetchData";

async function returnMessage(res, setMessage) {
    let data = await res.json()
    if (data.message) {
        console.log(data.message)
        await setMessage(data.message)
    }
}

export async function addItems(body, e, setMessage, url) {
    e.preventDefault()
    const res = await fetchData.post(url, body)
    await returnMessage(res, setMessage)
}

export async function updateItems(body, e, setMessage, url) {
    e.preventDefault()
    const res = await fetchData.patch(url, body)
    await returnMessage(res, setMessage)
}

export async function deleteItems(body, e, setMessage, url) {
    e.preventDefault()
    const res = await fetchData.Delete(url, body)
    await returnMessage(res, setMessage)
}

export function searchUsername(query, data) {
    //Our search filter function
    const searchFilter = (array) => {
        return array.filter(
            (el) => el.username.toLowerCase().includes(query.toLowerCase())
        )
    }
    return searchFilter(data)
}
