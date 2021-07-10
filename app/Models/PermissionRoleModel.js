const {Sequelize, Model, DataTypes} = require("sequelize");
const dbCon = require('../../database/connection');
const PermissionModel = require('./PermissionModel');
const RoleModel = require('./RoleModel');

const PermissionRole = dbCon.define('PermissionRole', {
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

PermissionModel.belongsToMany(RoleModel, {
    through: PermissionRole,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: "permissionId",
});

RoleModel.belongsToMany(PermissionModel, {
    through: PermissionRole,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: "roleId",
});

RoleModel.hasMany(PermissionRole);
PermissionRole.belongsTo(RoleModel);
PermissionModel.hasMany(PermissionRole);
PermissionRole.belongsTo(PermissionModel);

module.exports = PermissionRole;
