const fs = require('fs');

// tables in JSON file for simplicity, store in a db for production applications
let tables = require('data/tables.json');

export const tablesRepo = {
    getAll: () => tables,
    find: x => tables.find(x),
    getByFilter,
    delete: _delete
};

function getByFilter(data){

}
// prefixed with underscore '_' because 'delete' is a reserved word in javascript
function _delete(id) {
    // filter out deleted table and save
    tables = tables.filter(x => x.id.toString() !== id.toString());
    saveData();
    
}

// private helper functions

function saveData() {
    fs.writeFileSync('data/tables.json', JSON.stringify(tables, null, 4));
}