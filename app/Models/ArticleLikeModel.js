const { Sequelize, Model, DataTypes } = require("sequelize");
const dbCon = require('../../database/connection');
const ArticleModel = require('./ArticleModel');
const UserModel = require('./UserModel');

const ArticleLike = dbCon.define('ArticleLike', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        required: true,
    },
    articleId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'articles',
            key: 'id'
        },
        onDelete: 'CASCADE',
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        },
        onDelete: 'CASCADE',
    },
    isLike: {
        type: DataTypes.BOOLEAN,
        required: true,
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

ArticleModel.belongsToMany(UserModel, {
    through: ArticleLike,
    onDelete: 'CASCADE',
    foreignKey: "articleId",
});
UserModel.belongsToMany(ArticleModel, {
    through: ArticleLike,
    onDelete: 'CASCADE',
    foreignKey: "userId",
});

module.exports = ArticleLike;

