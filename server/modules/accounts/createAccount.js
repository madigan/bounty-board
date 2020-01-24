const Account = require('./Account');

async function createAccount({ name, email, password }, { knex }) {
    if (!name) throw new Error("Name is required!");
    if (!email) throw new Error("Email is required!");
    if (!password) throw new Error("Password is required!");

    // TODO: Encrypt password
    // TODO: Add "DAO" equivalent
    return knex('accounts').insert({ name, email, password });
}

module.exports = createAccount;