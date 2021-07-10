const { Sequelize, Model, DataTypes } = require("sequelize");
let config = require('../../config.js');

module.exports = new Sequelize(config.database, config.username, config.password, {
    dialect: 'mysql',
    dialectOptions: {
        connectTimeout: 1000
    }
});
