const fs = require('fs');

// reservation in JSON file for simplicity, store in a db for production applications
let reservations = require('data/reservations.json');

export const reservationRepo = {
    getAll: () => reservations,
    getByUserId: id => reservations.filter(x => x.userId.toString() === id.toString()),
    find: x => reservations.find(x),
    create,
    update,
    delete: _delete
};

function create(reservation) {
    // generate new reservation id
    reservation.id = reservations.length ? Math.max(...reservations.map(x => x.id)) + 1 : 1;


    // add and save reservation
    reservations.push(reservation);

    saveData();

    return reservation.id
}

function update(id, params) {
    const reservation = reservation.find(x => x.id.toString() === id.toString());

    // set date updated
    reservation.dateUpdated = new Date().toString();

    // update and save
    Object.assign(reservation, params);
    saveData();
}

// prefixed with underscore '_' because 'delete' is a reserved word in javascript
function _delete(id) {
    // filter out deleted reservation and save
    const tables = reservations.filter(x => x.id.toString() === id.toString())[0].tableid
    reservations = reservations.filter(x => x.id.toString() !== id.toString());
    saveData();
    console.log(tables + "0000");
    return tables
}

// updates jsonfile

function saveData() {
    fs.writeFileSync('data/reservations.json', JSON.stringify(reservations, null, 4));
}