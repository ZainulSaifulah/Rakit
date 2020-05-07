//Import module yang dibutuhkan
const Sequelize = require('sequelize')
const sequelize = require('../config/db')
const Service = require('./Service')

//Class Doctor 
class Doctor extends Sequelize.Model { }

//Inisialisasi tabel 
Doctor.init(
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: Sequelize.STRING,
        gender: Sequelize.STRING,
        address: Sequelize.TEXT,
    },
    {
        sequelize, modelName: 'doctor'
    }
)

//Inisialisasi relasi dengan model Service
Doctor.belongsTo(Service) 

//Export module
module.exports = Doctor
