//Import module yang dibutuhkan
const Sequelize = require('sequelize')
const sequelize = require('../config/db')

// Class Service
class Service extends Sequelize.Model {}

//Inisialisasi tabel
Service.init(
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: Sequelize.STRING,
        type: Sequelize.STRING, 
        status: Sequelize.STRING,
    },
    {
        sequelize, modelName: 'service'
    }
)

//Export module
module.exports = Service