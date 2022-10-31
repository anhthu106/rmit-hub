import {fetchData} from "../fetchData/fetchData";

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
