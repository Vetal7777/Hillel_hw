const add = require('./add');
const division = require('./division');
const minus = require('./minus');
const multiplication = require('./multiplication');

module.exports = {
    add: Object.values(add)[0],
    division: Object.values(division)[0],
    minus: Object.values(minus)[0],
    multiplication: Object.values(multiplication)[0],
}

