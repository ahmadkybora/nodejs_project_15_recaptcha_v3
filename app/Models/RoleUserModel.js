const {Sequelize, Model, DataTypes} = require("sequelize");
const dbCon = require('../../database/connection');
const UserModel = require('./UserModel');
const RoleModel = require('./RoleModel');

const RoleUser = dbCon.define('RoleUser', {
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
    roleId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'roles',
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

UserModel.belongsToMany(RoleModel, {
    through: RoleUser,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: "userId",
});

RoleModel.belongsToMany(UserModel, {
    through: RoleUser,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: "roleId",
});

RoleModel.hasMany(RoleUser);
RoleUser.belongsTo(RoleModel);
UserModel.hasMany(RoleUser);
RoleUser.belongsTo(UserModel);

module.exports = RoleUser;
