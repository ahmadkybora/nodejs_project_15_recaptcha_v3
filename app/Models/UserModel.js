const {Sequelize, Model, DataTypes} = require("sequelize");
const dbCon = require('../../database/connection');
const bcrypt = require('bcrypt');

const User = dbCon.define('User', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        required: true,
    },
    first_name: {
        type: DataTypes.STRING,
        required: true,
    },
    last_name: {
        type: DataTypes.STRING,
        required: true,
    },
    username: {
        type: DataTypes.STRING,
        required: true,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
    },
    mobile: {
        type: DataTypes.STRING,
    },
    home_phone: {
        type: DataTypes.STRING,
    },
    zip_code: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
        required: true,
    },
    home_address: {
        type: DataTypes.STRING,
    },
    work_address: {
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
    image: {
        type: DataTypes.STRING
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

/*const user = async () => {
    const password = '12345678';
    const hash = await bcrypt.hash(password, 10);

    const admin = await User.create({
        first_name: 'admin',
        last_name: 'admin',
        username: 'admin',
        email: 'admin@gmail.com',
        mobile: '1234567890',
        home_phone: '1234567890',
        zip_code: '1234567890',
        password: hash,
        home_address: 'i have no home address',
        work_address: 'i have no work address',
        state: 'ACTIVE',
        image: '',
        createdAt: Date.now(),
        updatedAt: Date.now(),
    });
};
user();*/

module.exports = User;

