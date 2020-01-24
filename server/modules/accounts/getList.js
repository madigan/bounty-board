const Account = require('./Account');

async function getList(args, { knex }) {
    const data = await knex.from("accounts").select('*');
    return data.map(item => new Account(item));
}

module.exports = getList;