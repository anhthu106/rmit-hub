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

async function patch(url, body){
    /**
     * PATCH METHOD
     */
    return await fetch(url, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    })
}

export const fetchData = {
    post,
    get,
    patch
}