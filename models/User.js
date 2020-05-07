//Import module yang dibutuhkan
const Sequelize = require('sequelize');
const sequelize = require('../config/db');

//Class User
class User extends Sequelize.Model { }

//Inisialisasi tabel user
User.init(
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: Sequelize.STRING,
        username: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.STRING,
    },
    {
        sequelize, modelName: 'user'
    });

//export module
module.exports = User;