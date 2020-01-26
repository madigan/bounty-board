const fs = require('fs');

const glob = require('glob');
const { AutoComplete, Input } = require('enquirer');

const NEW_TABLE = "< new >";

/**
 * Main migration script
 */
async function main() {
    // Get the list of existing tables
    const choices = [];
    const tableFiles = glob.sync("./server/modules/**/*.table.js");
    tableFiles.map(file => {
        const table = require("." + file);
        choices.push(table.tableName);
    });
    choices.push(NEW_TABLE);
    let running = true;
    let answers = [];

    // Get the migration name
    const migrationName = await new Input({
        message: "What do you want to call the migration?",
        initial: "myHappyMigration"
    }).run();

    // Let the user select tables or define new ones
    while (running) {
        // Let the user select the tables they want
        answers = await new AutoComplete({
            name: 'tables',
            message: 'Choose the table(s) to migrate',
            choices: choices.sort(),
            multiple: true
        }).run();
        // If they select "new", then prompt them for the new table name
        if (answers.includes(NEW_TABLE)) {
            const newTable = await new Input({
                message: "What is the new table called?",
                initial: "new_table"
            }).run();
            choices.push(newTable);
        } else { // Otherwise proceed with the answers
            running = false;
        }
    }
    if (answers.length <= 0) {
        console.log("No tables selected. No migration generated.");
    } else {
        const migrationFns = answers.map(answer => `
// Migrate ${answer}
async function ${answer}_up(builder, Sequelize, shouldSeed) {
    // Make your changes here

}
async function ${answer}_down(builder, Sequelize) {
    // Undo your changes here

}
`).join('\n');

        let migration = `
module.exports = {
    async up(builder, Sequelize, shouldSeed) {`
        answers.forEach(answer => migration += `
        ${answer}_up(builder, Sequelize, shouldSeed);`);

        migration += `
    },
    async down(builder, Sequelize) {`;

        answers.forEach(answer => migration += `
        ${answer}_down(builder, Sequelize);`);

        migration += `
    }
}
${migrationFns}
`;

        console.log(migration + "\n");
        fs.writeFileSync(`./migrations/${Date.now()}_${migrationName}.js`, migration);
    }
}

main()
    .catch(console.error);