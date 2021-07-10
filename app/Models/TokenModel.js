const { Sequelize, Model, DataTypes } = require("sequelize");
const dbCon = require('../../database/connection');
const User = require('./UserModel');

const Token = dbCon.define('Token', {
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
            model: 'tokens',
            key: 'id'
        },
        onDelete: 'CASCADE',
    },*/
    token: {
        type: DataTypes.TEXT,
    },
    revoke: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    expireAt: {
        type: DataTypes.DATE
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

Token.belongsTo(User, {
    foreignKey: 'userId',
    constraint: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

User.hasMany(Token, {
    foreignKey: 'userId',
    constraint: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

module.exports = Token;

