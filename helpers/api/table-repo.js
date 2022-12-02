

const fs = require('fs');

// tables in JSON file for simplicity, store in a db for production applications
let tables = require('data/tables.json');

export const tablesRepo = {
    getAll: () => tables,
    find: x => tables.find(x),
    getByFilter,
    book,
    unbook,
    delete: _delete
};

function book(id) {
    const table = tables.filter(table => id.includes(table.TableId[0].toString()));
    const params = {"booked": true}
    
    table.forEach(thing => Object.assign(thing, params));

    saveData()
}

function unbook(id) {
    const table = tables.filter(table => id.includes(table.TableId[0].toString()));
    const params = {"booked": false}
    
    table.forEach(thing => Object.assign(thing, params));

    saveData()
}

function getByFilter(date, seats) {
    const newDate = new Date(date).toISOString();
    const combined = {};
    let filtered_table = tables.filter(x => x.date === newDate && x.seats[0] === parseInt(seats) && x.booked === false)

    if (filtered_table.length !== 0) {
        return [filtered_table[0]]
    }
    else {
        filtered_table = tables.filter(x => x.date.toString() === newDate && x.booked === false)
        for (let i = 0; i < filtered_table.length; i++) {
            for (let j = i + 1; j < filtered_table.length; j++) {
                if (filtered_table[j].seats == seats - filtered_table[i].seats) {
                    combined.TableId = [filtered_table[i].TableId[0], filtered_table[j].TableId[0]]
                    combined.seats = [filtered_table[i].seats[0], filtered_table[j].seats[0]]
                    combined.date = filtered_table[i].date
                    return [combined]
                }
            }
        }
        console.log('none')
        return null;
    }
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