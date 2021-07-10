const {Sequelize, Model, DataTypes} = require("sequelize");
const dbCon = require('../../database/connection');

const RoleModel = dbCon.define('Role', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        required: true,
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        required: true,
    },
    description: {
        type: DataTypes.STRING,
    },
    state: {
        type: DataTypes.ENUM('ACTIVE', 'INACTIVE', 'SUSPENDED', 'PENDING'),
        required: true,
        validate: {
            isIn: [
                ['ACTIVE', 'INACTIVE', 'SUSPENDED', 'PENDING']
            ],
        },
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE
    },
    updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
    }
});

module.exports = RoleModel;

