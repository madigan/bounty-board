const Model = require('core/Model');

class Account extends Model {
    constructor({ id, email, name, password }) {
        super();
        this.id = id;
        this.email = email;
        this.name = name;
        this.password = password;
    }
}

module.exports = Account;