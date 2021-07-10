const { Sequelize, Model, DataTypes } = require("sequelize");
const dbCon = require('../../database/connection');
const BrandModel = require('./BrandModel');
const EmployeeModel = require('./EmployeeModel');

const ProductCategory = dbCon.define('ProductCategory', {
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
    brandId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'brands',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    name: {
        type: DataTypes.STRING,
        required: true,
    },
    image: {
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

ProductCategory.belongsTo(BrandModel, {
    foreignKey: 'brandId',
    constraint: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

BrandModel.hasMany(ProductCategory, {
    foreignKey: 'brandId',
    constraint: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

ProductCategory.belongsTo(EmployeeModel, {
    foreignKey: 'employeeId',
    constraint: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

EmployeeModel.hasMany(ProductCategory, {
    foreignKey: 'employeeId',
    constraint: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

module.exports = ProductCategory;
