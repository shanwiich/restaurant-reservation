const bcrypt = require('bcryptjs');

import { apiHandler } from 'helpers/api';
import { reservationRepo, omit } from 'helpers/api';

export default apiHandler({
    get: getById,
    put: update,
    delete: _delete,
    post: add
});

function add(req, res) {
    //split out password from user details 
    const user = req.body;
    console.log(user)
    console.log(req.body)
    //console.log("res" + res)

    // validate
    // if (reservationRepo.find(x => x.username === user.username))
    //     throw `User with the username "${user.username}" already exists`;

    // // hash password
    // user.hash = bcrypt.hashSync(password, 10);    

    reservationRepo.create(req.query.id, user);
    return res.status(200).json({});
}

function getById(req, res) {
    const user = reservationRepo.getById(req.query.id);

    if (!user) throw 'User Not Found';

    return res.status(200).json(omit(user, 'hash'));
}

function update(req, res) {
    const user = reservationRepo.getById(req.query.id);

    if (!user) throw 'User Not Found';

    // split out password from user details 
    const { password, ...params } = req.body;

    // validate
    if (user.username !== params.username && reservationRepo.find(x => x.username === params.username))
        throw `User with the username "${params.username}" already exists`;

    // only update hashed password if entered
    if (password) {
        user.hash = bcrypt.hashSync(password, 10);
    }

    reservationRepo.update(req.query.id, params);
    return res.status(200).json({});
}

function _delete(req, res) {
    reservationRepo.delete(req.query.id);
    return res.status(200).json({});
}
