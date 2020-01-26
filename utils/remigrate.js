const migrate = require('../server/services/migrate');

migrate.down()
    .then(() => migrate.up()
        .then(() => console.log("Remigration completed successfully."))
        .catch(error => {
            console.error(`Remigration failed on up: ${error.message}`);
            process.exit(1);
        }))
    .catch(error => {
        console.error(`Remigration failed on down: ${error.message}`);
        process.exit(1);
    });