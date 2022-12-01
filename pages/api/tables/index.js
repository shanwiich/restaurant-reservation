import { apiHandler, usersRepo, omit } from 'helpers/api';
import { tablesRepo } from 'helpers/api/table-repo';

export default apiHandler({
    get: getTables
});

function getTables(req, res) {
    // return users without hashed passwords in the response
    const response = tablesRepo.getAll().map(x => omit(x, 'hash'));
    return res.status(200).json(response);
}
