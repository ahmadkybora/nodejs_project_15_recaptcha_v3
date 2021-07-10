const {Sequelize, Model, DataTypes} = require("sequelize");
const dbCon = require('../../database/connection');

const Employee = dbCon.define("Employee", {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        required: true,
    },
    first_name: {
        type: DataTypes.STRING,
        required: true,
        validate: {
            min: 2,
            max: 255,
        },
    },
    last_name: {
        type: DataTypes.STRING,
        required: true,
        validate: {
            min: 2,
            max: 255,
        },
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        required: true,
        allowNull: false,
        validate: {
            min: 2,
            max: 255,
            notEmpty: true,
        },
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        required: true,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    mobile: {
        type: DataTypes.STRING,
        unique: true,
        required: true,

        validate: {
            isNumeric: true,
            notEmpty: true,
        },
    },
    home_phone: {
        type: DataTypes.STRING,
        validate: {
            isNumeric: true,
        },
    },
    zip_code: {
        type: DataTypes.STRING,
        validate: {
            isNumeric: true,
        },
    },
    password: {
        type: DataTypes.STRING(64),
        //is: /^[0-9a-f]{64}$/,
        required: true,
    },
    home_address: {
        type: DataTypes.STRING
    },
    work_address: {
        type: DataTypes.STRING
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
    image: {
        type: DataTypes.STRING,
    },
});

module.exports = Employee;
