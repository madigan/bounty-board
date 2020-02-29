const { DataTypes } = require('sequelize');
const sequelize = require('../../services/Database');

const AccountTable = sequelize.define('Account', {
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
}, {
    tableName: 'accounts'
});

module.exports = AccountTable;