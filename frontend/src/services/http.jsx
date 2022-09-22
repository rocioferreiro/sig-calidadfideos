export const baseurl = 'https://pastaqualityapi.herokuapp.com/';

const request = (url, method, body, config) => {

    let headers = {
        "Content-Type": "application/json", "Access-Control-Allow-Origin": "*"
    };
    const configuration = {
        method: method, body: body ? JSON.stringify(body) : undefined, headers: headers,
    };
    return fetch(baseurl + url, configuration)

        .then(response => {
            if (response.ok) {
                return response.json();
            }

            // if an error occurs on the server return the errorMessage in case we intentionally threw that error, or a generic one in case an unexpected exception rises.
            return response.json().then(error => {
                if (error.hasOwnProperty('message')) {
                    throw (error.message)
                } else throw new Error("¡Error inesperado del servidor!")
            })
        })
        // Catch connection errors and the error throw above.
        .catch(error => {
            throw(error)
        })
}

export const get = (url, config = {}) => request(url, "GET", null, config);
export const getWithBody = (url, body, config = {}) => request(url, "GET", body, config);
export const post = (url, body, config = {}) => request(url, "POST", body, config);
export const put = (url, body, config = {}) => request(url, "PUT", body, config);
export const del = (url, config = {}) => request(url, "DELETE", null, config);