import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router';

import { fetchWrapper } from 'helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/tables`;
const baseDom = `${publicRuntimeConfig.apiUrl}`
const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('user')));

export const tableService = {
    user: userSubject.asObservable(),
    get userValue () { return userSubject.value },
    getAll,
    getByFilter,
    getByCode,
    delete: _delete,
    book

};

function getAll() {
    return fetchWrapper.get(baseUrl);
}

function getByFilter(id) {
    console.log(`get by id${baseUrl}/${id}`)
    return fetchWrapper.get(`${baseUrl}/${id}`);
}

function getByCode(code) {
    return fetchWrapper.get(`${baseUrl}/${code}`);
}

function book(id, data) {
    console.log(baseUrl)
    console.log(data)
    return fetchWrapper.post(`${baseUrl}/${id}`, data);
}

function update(id, params) {
    return fetchWrapper.put(`${baseUrl}/${id}`, params)
        .then(x => {
            // update stored user if the logged in user updated their own record
            if (userSubject.value != null && id === userSubject.value.id) {
                // update local storage
                const user = { ...userSubject.value, ...params };
                localStorage.setItem('user', JSON.stringify(user));

                // publish updated user to subscribers
                userSubject.next(user);
            }
            return x;
        });
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`);
}
