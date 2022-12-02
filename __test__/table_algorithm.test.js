const { getByFilter } = require('./table_algorithm.js');

test('canaryTest', () => {
    expect(true).toBe(true)
});

test('table algorithm test table of 4', () => {
    expect(getByFilter("2022-12-18", 4)).toStrictEqual([{"TableId": [1], "booked": false, "date": "2022-12-18", "seats": [4]}])
});

test('table algorithm test table of 5', () => {
    expect(getByFilter("2022-12-18", 5)).toStrictEqual([{"TableId": [2], "booked": false, "date": "2022-12-18", "seats": [6]}])
});

test('table algorithm test table of 7', () => {
    expect(getByFilter("2022-12-18", 7)).toStrictEqual([
        {"TableId": [2,3,], "seats": [6,2,], "date": "2022-12-18"}
    ])
});

test('table algorithm test table of 8', () => {
    expect(getByFilter("2022-12-18", 7)).toStrictEqual([
        {"TableId": [2,3,], "seats": [6,2,], "date": "2022-12-18"}
    ])
});

test('table algorithm test no seat combination available', () => {
    expect(getByFilter("2022-12-18", 20)).toStrictEqual(null)
});




