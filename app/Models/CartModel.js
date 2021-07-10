const {Sequelize, Model, DataTypes} = require("sequelize");
const sequelize = require('../../database/connection');
const UserModel = require('./UserModel');
const ProductModel = require('./ProductModel');

const Cart = sequelize.define('Cart', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        required: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    productId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'products',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    quantity: {
        type: DataTypes.STRING,
    },
    state: {
        type: DataTypes.ENUM('ACTIVE', 'INACTIVE', 'SUSPENDED', 'PENDING', 'HISTORY'),
        required: true,
        validate: {
            isIn: [
                ['ACTIVE', 'INACTIVE', 'SUSPENDED', 'PENDING', 'HISTORY']
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

Cart.belongsTo(UserModel, {
    foreignKey: 'userId',
    constraint: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

UserModel.hasMany(Cart, {
    foreignKey: 'userId',
    constraint: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

Cart.belongsTo(ProductModel, {
    foreignKey: 'productId',
    constraint: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

ProductModel.hasMany(Cart, {
    foreignKey: 'productId',
    constraint: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

module.exports = Cart;

