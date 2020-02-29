const Sequelize = require('sequelize');
const Response = require('core/Response');

const getList = require('./getList');
const createAccount = require('./createAccount');

class AccountModule {
    constructor({ sequelize }) {
        /**
         * @type {Sequelize}
         */
        this.sequelize = sequelize;

        this.AccountDB = sequelize.define('account', {
            name: {
                type: Sequelize.STRING
            },
            email: {
                type: Sequelize.STRING
            },
            password: {
                type: Sequelize.STRING
            }
        })
    }


}

const manifest = {
    info: {
        name: 'Account'
    },
    layers: {                   // TODO: Find a better name
        router: {               // TODO: Create RouterConfig class / interface
            useDefaults: true,  // TODO: Add exceptions
        }
    }
}
module.exports = {

}