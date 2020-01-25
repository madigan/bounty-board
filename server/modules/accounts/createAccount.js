const Account = require('./Account');

async function createAccount({ name, email, password }, { knex, encryption }) {
    if (!name) throw new Error("Name is required!"); // TODO: Replace with something like hapi/joi
    if (!email) throw new Error("Email is required!");
    if (!password) throw new Error("Password is required!");

    const encryptedPassword = encryption.encrypt(password);
    // TODO: Add "DAO" equivalent
    return knex('accounts').insert({ name, email, password: encryptedPassword });
}

module.exports = createAccount;