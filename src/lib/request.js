const fetchAPI = (request, settings = {}) => {
    let url = request;
    if( process.env.NODE_ENV !== 'production'){
        url = `http://localhost:4000${request}`
    }
    return fetch(url, settings)
}

export default fetchAPI;