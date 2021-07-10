const { Sequelize, Model, DataTypes } = require("sequelize");
const dbCon = require('../../database/connection');
const ProductCategory = require('./ProductCategoryModel');

const Product = dbCon.define('Product', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        required: true,
    },
    categoryId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'productcategories',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    name: {
        type: DataTypes.STRING,
        required: true,
    },
    price: {
        type: DataTypes.STRING,
        required: true,
    },
    description: {
        type: DataTypes.STRING,
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

Product.belongsTo(ProductCategory, {
    foreignKey: 'categoryId',
    constraint: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

ProductCategory.hasMany(Product, {
    foreignKey: 'categoryId',
    constraint: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

module.exports = Product;

