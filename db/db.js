const knex = require("knex");

const knexfile = require("./knexfile");

//use env vars
const db = knex(knexfile.development);

module.exports = db;
