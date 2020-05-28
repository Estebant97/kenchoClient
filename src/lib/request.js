const fetchAPI = (request, settings = {}) => {
    let url = request;
    if( process.env.NODE_ENV !== 'production'){
        url = `http://localhost:4000${request}`
    }
    if( process.env.NODE_ENV === 'production'){
        url = `https://still-tor-99341.herokuapp.com${request}`
    }
    return fetch(url, settings)
}

export default fetchAPI;