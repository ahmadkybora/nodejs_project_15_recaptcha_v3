const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require('../../database/connection');
const EmployeeModel = require('./EmployeeModel');

const Brand = sequelize.define('Brand', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        required: true,
    },
    employeeId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'employees',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    name: {
        type: DataTypes.STRING,
        unique: true
    },
    description: {
        type: DataTypes.TEXT,
    },
    image: {
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
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE
    },
    updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
    }
});

Brand.belongsTo(EmployeeModel, {
    foreignKey: 'employeeId',
    constraint: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

EmployeeModel.hasMany(Brand, {
    foreignKey: 'employeeId',
    constraint: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

module.exports = Brand;

