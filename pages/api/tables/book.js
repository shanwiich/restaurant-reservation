import { apiHandler, usersRepo, omit } from 'helpers/api';
import { tablesRepo } from 'helpers/api/table-repo';

export default apiHandler({
    put: book
});

// function getTablesByFilter(req, res) {
//     // return users without hashed passwords in the response
//     console.log(req.query.filter)
//     //const response = tablesRepo.getAll().map(x => omit(x, 'hash'));
//     return res.status(200).json({});
// }

function book(req, res) {
    console.log("booking: "+ req.body)

    // // validate
    // if (user.username !== params.username && usersRepo.find(x => x.username === params.username))
    //     throw `User with the username "${params.username}" already exists`;

    // // only update hashed password if entered
    // if (password) {
    //     user.hash = bcrypt.hashSync(password, 10);
    // }
    console.log(tablesRepo.book(req.body))
    // usersRepo.update(req.query.id, params);
    return res.status(200).json({});
}