async function post(url, body){
    /**
     * POST METHOD
     */
    return await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    })
}

async function get(url){
    /**
     * GET METHOD
     */
    return await fetch(url,  {
        method: "GET",
    })
}

export const fetchData = {
    post,
    get
}