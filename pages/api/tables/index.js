import { apiHandler, usersRepo, omit } from 'helpers/api';
import { tablesRepo } from 'helpers/api/table-repo';
import register from '../users/register';

export default apiHandler({
    get: getTables,
    put: unbook
});

function getTables(req, res) {
    // return users without hashed passwords in the response
    const response = tablesRepo.getAll().map(x => omit(x, 'hash'));
    return res.status(200).json(response);
}

function unbook(req, res) {
    console.log("unboooking " + req.body)
    tablesRepo.unbook(req.body)
    // usersRepo.update(req.query.id, params);
    return res.status(200).json({});
}
