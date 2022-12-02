import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router';

import { fetchWrapper } from 'helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/reservations/check-date`;
const baseDom = `${publicRuntimeConfig.apiUrl}`
const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('user')));

const dates = ["2022-12-23", "2022-12-24"];

export const feeService = {
    checkDate
};

function checkDate(date) {
    console.log(date)
    return dates.includes(date);
}