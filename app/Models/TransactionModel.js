const {Sequelize, Model, DataTypes} = require("sequelize");
const sequelize = require('../../database/connection');
const User = require('./UserModel');
const Employee = require('./EmployeeModel');
const Bank = require('./BankModel');

const Transaction = sequelize.define('Transaction', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        required: true,
    },
    /*userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        },
        onDelete: 'CASCADE',
    },
    employeeId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'employees',
            key: 'id'
        },
        onDelete: 'CASCADE',
    },
    bankId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'banks',
            key: 'id'
        },
        onDelete: 'CASCADE',
    },*/
    transaction_code: {
        type: DataTypes.STRING,
        //unique: true
    },
    amount: {
        type: DataTypes.STRING,
    },
    image: {
        type: DataTypes.STRING
    },
    state: {
        type: DataTypes.ENUM('ACTIVE', 'INACTIVE', 'SUSPENDED', 'PENDING'),
        //required: true,
        validate: {
            isIn: [
                ['ACTIVE', 'INACTIVE', 'SUSPENDED', 'PENDING']
            ],
        },
    },
    transactedAt: {
        type: DataTypes.DATE
    },
    confirmedAt: {
        type: DataTypes.DATE
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

Transaction.belongsTo(User, {
    foreignKey: 'userId',
    constraint: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

Transaction.belongsTo(User, {
    foreignKey: 'userId',
    constraint: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

User.hasMany(Transaction, {
    foreignKey: 'userId',
    constraint: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

Transaction.belongsTo(Employee, {
    foreignKey: 'employeeId',
    constraint: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

Employee.hasMany(Transaction, {
    foreignKey: 'employeeId',
    constraint: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

Transaction.belongsTo(Bank, {
    foreignKey: 'bankId',
    constraint: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

Bank.hasMany(Transaction, {
    foreignKey: 'bankId',
    constraint: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

module.exports = Transaction;

