const bcrypt = require('bcryptjs');

import { apiHandler } from 'helpers/api';
import { reservationRepo, omit } from 'helpers/api';

export default apiHandler({
    get: getByCode,
    put: update,
    delete: _delete,
    post: add
});

function add(req, res) {
    const reservation = req.body;   

    const reservationID = reservationRepo.create(reservation);

    return res.status(200).json({"reservationID" : reservationID});
}

function getByCode(req, res) {
    const reservation = reservationRepo.getByCode(req.query.id);

    if (!reservation) throw 'reservation Not Found';

    return res.status(200).json(omit(reservation, 'hash'));
}

function update(req, res) {
    const reservation = reservationRepo.getByCode(req.query.id);

    if (!reservation) throw 'reservation Not Found';

    // split out password from reservation details 
    const { password, ...params } = req.body;

    // validate
    if (reservation.reservationname !== params.reservationname && reservationRepo.find(x => x.reservationname === params.reservationname))
        throw `reservation with the reservationname "${params.reservationname}" already exists`;

    // only update hashed password if entered
    if (password) {
        reservation.hash = bcrypt.hashSync(password, 10);
    }

    reservationRepo.update(req.query.id, params);
    return res.status(200).json({});
}

function _delete(req, res) {
    reservationRepo.delete(req.query.id);
    return res.status(200).json({});
}
