const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.DB_FILE || './data/database.sqlite',
    logging: false
});

module.exports = sequelize;