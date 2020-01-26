const uuid = require('uuid/v4');

const AccountTable = require('./Account.table');

async function createAccount({ name, email, password }, { encryption }) {
    if (!name) throw new Error("Name is required!"); // TODO: Replace with something like hapi/joi
    if (!email) throw new Error("Email is required!");
    if (!password) throw new Error("Password is required!");

    const encryptedPassword = encryption.encrypt(password);
    return AccountTable.build({
        id: uuid(),
        name,
        email,
        password: encryptedPassword
    }).save();
}

module.exports = createAccount;