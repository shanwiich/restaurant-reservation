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
    getTablesByFilter,
    getTablesById,
    delete: _delete,
    book

};

//gets all the reservations
function getAll() {
    return fetchWrapper.get(baseUrl);
}

//gets possible reservations from num of guests and date. Combines tables as well. If multiple tables, their id's should be sent as well.
function getTablesByFilter(numOfGuests, date) {
    // console.log(`get by id${baseUrl}/${id}`)
    // return fetchWrapper.get(`${baseUrl}/${id}`);
}

//gets Table based on their table Id if a user wants to look at their reservations. Could send array of id if tables are combined
function getTablesById(code) {
    // return fetchWrapper.get(`${baseUrl}/${code}`);
}

//book a table. If it is open: true, it should be open: false
function book(reservationId, data) {
    // return fetchWrapper.post(`${baseUrl}/${tableId}`, data);
}

// unbook a table if user deletes reservation
function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`);
}
