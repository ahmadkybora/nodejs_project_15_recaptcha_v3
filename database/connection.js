const config = require('./config');
const {Sequelize} = require("sequelize");

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password, {
        dialect: 'mysql',
        dialectOptions: {
            connectTimeout: 1000
        }
    });

module.exports = sequelize;
