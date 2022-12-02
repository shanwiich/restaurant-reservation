function getByFilter(date, seats) {
    const newDate = date;
    const combined = {};
    let filtered_table = tables.filter(x => x.date === newDate && (x.seats[0] === parseInt(seats) || x.seats[0] === parseInt(seats)+1)  && x.booked === false)

    if (filtered_table.length !== 0) {
        return [filtered_table[0]]
    }
    else {
        filtered_table = tables.filter(x => x.date.toString() === newDate && x.booked === false)
        for (let i = 0; i < filtered_table.length; i++) {
            for (let j = i + 1; j < filtered_table.length; j++) {
                if (filtered_table[j].seats == seats - filtered_table[i].seats || filtered_table[j].seats == seats - filtered_table[i].seats + 1) {
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

const tables = [
    {
        "TableId": [1],
        "seats": [4],
        "date": "2022-12-18",
        "booked": false
    },
    {
        "TableId": [2],
        "seats": [6],
        "date": "2022-12-18",
        "booked": false
    },
    {
        "TableId": [3],
        "seats": [2],
        "date": "2022-12-18",
        "booked": false
    }
]

module.exports = { getByFilter };