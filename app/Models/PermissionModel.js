const {Sequelize, Model, DataTypes} = require("sequelize");
const dbCon = require('../../database/connection');

const PermissionModel = dbCon.define('Permission', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        required: true,
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
    },
    description: {
        type: DataTypes.STRING,
    },
    state: {
        type: DataTypes.ENUM('ACTIVE', 'INACTIVE', 'SUSPENDED', 'PENDING'),
        /*required: true,
        validate: {
            isIn: [
                ['ACTIVE', 'INACTIVE', 'SUSPENDED', 'PENDING']
            ],
        },*/
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

/*const permissions = [
    'all-employee',
    'view-employee',
    'create-employee',
    'update-employee',
    'destroy-employee',
    'all-user',
    'view-user',
    'create-user',
    'update-user',
    'destroy-user',
    'all-brand',
    'view-brand',
    'create-brand',
    'update-brand',
    'destroy-brand',
    'all-product-category',
    'view-product-category',
    'create-product-category',
    'update-product-category',
    'destroy-product-category',
    'all-product',
    'view-product',
    'create-product',
    'update-product',
    'destroy-product',
    'all-article-category',
    'view-article-category',
    'create-article-category',
    'update-article-category',
    'destroy-article-category',
    'all-article',
    'view-article',
    'create-article',
    'update-article',
    'destroy-article',
    'all-role',
    'view-role',
    'create-role',
    'update-role',
    'destroy-role',
    'all-order',
    'view-order',
    'create-order',
    'update-order',
    'destroy-order',
    'all-bank',
    'view-bank',
    'create-bank',
    'update-bank',
    'destroy-bank',
    'all-transaction',
    'view-transaction',
    'create-transaction',
    'update-transaction',
    'destroy-transaction',
];

for (let i = 0; i < permissions.length; i++) {
    PermissionModel.create({
        name: permissions[i]
    });
}*/

module.exports = PermissionModel;

