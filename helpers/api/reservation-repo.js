const fs = require('fs');

// reservation in JSON file for simplicity, store in a db for production applications
let reservations = require('data/reservations.json');

export const reservationRepo = {
    getAll: () => reservation,
    getById: id => reservation.find(x => x.id.toString() === id.toString()),
    find: x => reservation.find(x),
    create,
    update,
    delete: _delete
};

function create(id, reservation) {
    // generate new reservation id
    reservation.id = reservations.length ? Math.max(...reservations.map(x => x.id)) + 1 : 1;
    reservation.userId = id;
    // set date created and updated
    reservation.dateCreated = new Date().toISOString();
    reservation.dateUpdated = new Date().toISOString();


    // add and save reservation
    reservations.push(reservation);
    saveData();

    return reservation.id
}

function update(id, params) {
    const reservation = reservation.find(x => x.id.toString() === id.toString());

    // set date updated
    reservation.dateUpdated = new Date().toISOString();

    // update and save
    Object.assign(reservation, params);
    saveData();
}

// prefixed with underscore '_' because 'delete' is a reserved word in javascript
function _delete(id) {
    // filter out deleted reservation and save
    reservation = reservation.filter(x => x.id.toString() !== id.toString());
    saveData();
    
}

// private helper functions

function saveData() {
    fs.writeFileSync('data/reservations.json', JSON.stringify(reservations, null, 4));
}