const fs = require('fs');

// tables in JSON file for simplicity, store in a db for production applications
let tables = require('data/tables.json');

export const tablesRepo = {
    getAll: () => tables,
    getByFilter: id => tables.find(x => x.id.toString() === id.toString()),
    find: x => tables.find(x),
    create,
    update,
    delete: _delete
};

function create(table) {
    // generate new table id
    table.id = tables.length ? Math.max(...tables.map(x => x.id)) + 1 : 1;

    // set date created and updated
    table.dateCreated = new Date().toString();
    table.dateUpdated = new Date().toString();

    // add and save table
    tables.push(table);
    saveData();
}

function update(id, params) {
    const table = tables.find(x => x.id.toString() === id.toString());

    // set date updated
    table.dateUpdated = new Date().toString();

    // update and save
    Object.assign(table, params);
    saveData();
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