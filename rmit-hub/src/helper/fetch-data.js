async function post(url, body){
    return await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    })
}

async function get(url, body){
    return await fetch(url,  {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    })
}


export const fetchData = {
    post,
    get
}