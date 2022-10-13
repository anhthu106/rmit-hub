import {fetchData} from "../fetch-data";

async function registerUser (body, e, setMessage){
    e.preventDefault()
    const res = await fetchData.post("/api/auth/register", body)
    let data = await res.json()
    if(data.message){
        console.log(data.message)
        await setMessage(data.message)
    }
    if(data.message === "success"){
        let options = { redirect: false,body}
        console.log(options)
    }
}

export default registerUser