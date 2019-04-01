import { promised } from "q";

export const fqMetaUrl = "http://localhost:8889/api/fqmeta";
export const userService = {
    login,
    logout
}

function login(authu, authp, tenantId) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ authu, authp, tenantId })
    }
    return fetch(`${fqMetaUrl}/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            if (user.token) {
                localStorage.setItem('user', JSON.stringify(user));
            }
            return user;
        })
}

function logout() {
    localStorage.removeItem('user');
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                //auto logout if 401 returned from api
                logout();
                //location.reload(true);
            }
            const error = (data && data.message) || response.statusText;
            return promised.reject(error);
        }
        return data;
    });
}