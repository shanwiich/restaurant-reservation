import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router';

import { fetchWrapper } from 'helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/reservations`;
const baseDom = `${publicRuntimeConfig.apiUrl}`
const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('user')));

export const reservationService = {
    user: userSubject.asObservable(),
    get userValue () { return userSubject.value },
    getAll,
    getByUserID,
    getByCode,
    delete: _delete,
    add

};

function getAll() {
    return fetchWrapper.get(baseUrl);
}

function getByUserID(id) {
    console.log(`HERE ${baseUrl}/${id}`)
    return fetchWrapper.get(`${baseUrl}/${id}`);
}

function getByCode(code) {
    return fetchWrapper.get(`${baseUrl}/${code}`);
}

function add(data) {
    return fetchWrapper.post(`${baseUrl}`, data);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`);
}
