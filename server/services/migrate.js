const Umzug = require('umzug');
const sequelize = require('./Db');

const migrator = new Umzug({
    storage: 'sequelize',
    storageOptions: {
        sequelize
    },
    migrations: {
        params: [
            sequelize.getQueryInterface(),
            sequelize.constructor,
            !!process.env.SEED_DATA // TODO: Refactor out process.env
        ],
        path: './migrations'
    }
});

module.exports = {
    async up() {
        const migrations = await migrator.up();
        migrations.forEach(migration => console.info(`+ ${migration.file}`));
        console.info("Migrations complete");
    },
    async down() {
        const migrations = await migrator.down();
        migrations.forEach(migration => console.info(`- ${migration.file}`));
        console.info("Un-migrations complete");
    }
}