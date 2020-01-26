const Account = require('./Account');
const AccountTable = require('./Account.table');

async function getList(args, { knex }) {
    const data = await AccountTable.findAll();
    return data.map(item => new Account(item));
}

module.exports = getList;