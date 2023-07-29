const config = {
    baseUrl: 'https://api.github.com/search',
    headers: {
        'Content-Type': 'application/json'
    }
}

const onResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}

class Api {
    constructor(data) {
        this._baseUrl = data.baseUrl;
        this._headers = data.headers;
    }

    searchUsers(query) {
        return fetch(`${this._baseUrl}/users?q=${query}`, {
            headers: this._headers,
            method: 'GET'
        }).then((res) => onResponse(res));
    }
}

export const api = new Api(config);
