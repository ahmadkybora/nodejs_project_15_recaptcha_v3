const {Sequelize, Model, DataTypes} = require("sequelize");
const dbCon = require('../../database/connection');
const ProductModel = require('./ProductModel');
const UserModel = require('./UserModel');

const ProductFavoriteLike = dbCon.define('ProductFavoriteLike', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        required: true,
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
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    isFavorite: {
        type: DataTypes.BOOLEAN,
    },
    isLike: {
        type: DataTypes.BOOLEAN,
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

ProductModel.belongsToMany(UserModel, {
    through: ProductFavoriteLike,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: "productId",
});

UserModel.belongsToMany(ProductModel, {
    through: ProductFavoriteLike,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: "userId",
});

UserModel.hasMany(ProductFavoriteLike);
ProductFavoriteLike.belongsTo(UserModel);
ProductModel.hasMany(ProductFavoriteLike);
ProductFavoriteLike.belongsTo(ProductModel);

module.exports = ProductFavoriteLike;
