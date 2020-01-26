const { DataTypes } = require('sequelize');

module.exports = {
    async up(builder, Sequelize, shouldSeed) {
        accounts_up(builder, Sequelize, shouldSeed);
    },
    async down(builder, Sequelize) {
        accounts_down(builder, Sequelize);
    }
}

// Migrate accounts
async function accounts_up(builder, Sequelize, shouldSeed) {
    return builder.createTable('accounts', {
        id: {
            primaryKey: true,
            type: DataTypes.UUIDV4,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE
        },
        updatedAt: {
            type: DataTypes.DATE
        }
    });
}
async function accounts_down(builder, Sequelize) {
    return builder.dropTable('accounts');
}

