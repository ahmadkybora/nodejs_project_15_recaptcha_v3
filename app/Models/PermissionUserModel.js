const {Sequelize, Model, DataTypes} = require("sequelize");
const dbCon = require('../../database/connection');
const PermissionModel = require('./PermissionModel');
const UserModel = require('./UserModel');

const PermissionUser = dbCon.define('PermissionUser', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        required: true,
    },
    permissionId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'permissions',
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
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE
    },
    updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
    }
});

PermissionModel.belongsToMany(UserModel, {
    through: PermissionUser,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: "permissionId",
});

UserModel.belongsToMany(PermissionModel, {
    through: PermissionUser,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: "userId",
});

UserModel.hasMany(PermissionUser);
PermissionUser.belongsTo(UserModel);
PermissionModel.hasMany(PermissionUser);
PermissionUser.belongsTo(PermissionModel);

module.exports = PermissionUser;
