const {Sequelize, Model, DataTypes} = require("sequelize");
const dbCon = require('../../database/connection');
const User = require('./UserModel');

const UserLog = dbCon.define('UserLog', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        required: true,
    },
    /*userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'userlogs',
            key: 'id'
        },
        onDelete: 'CASCADE',
    },*/
    loggedOut: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    loggedIn: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.fn('now')
    },
    logged_out_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.fn('now')
    },
    ip_address: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    device: {
        type: DataTypes.TEXT,
        allowNull: true
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
    },
});

UserLog.belongsTo(User, {
    foreignKey: 'userId',
    constraint: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

User.hasMany(UserLog, {
    foreignKey: 'userId',
    constraint: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

module.exports = UserLog;
