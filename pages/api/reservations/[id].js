const bcrypt = require('bcryptjs');

import { apiHandler } from 'helpers/api';
import { reservationRepo, omit } from 'helpers/api';

export default apiHandler({
    get: getByUserId,
    put: update,
    delete: _delete
});

function getByUserId(req, res) {
    const reservation = reservationRepo.getByUserId(parseInt(req.query.id));
    console.log(reservation + "gg" + req.query.id)
    //if (!reservation) throw 'reservation Not Found';

    return res.status(200).json(reservation);
}

function update(req, res) {
    const reservation = reservationRepo.getById(req.query.id);

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
    const response = reservationRepo.delete(req.query.id);
    console.log(response + 'f')
    return res.status(200).json({"tableid" : response});
}
