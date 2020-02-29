const Knex = require('knex');

module.exports = Knex({
    client: 'sqlite3',
    connection: {
        filename: process.env.DB_NAME || './data/database.sqlite'
    },
    debug: process.env.LOG_LEVEL === "DEBUG",
    pool: {
        min: 1,
        max: 8
    }
});