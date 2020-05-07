//Import module sequelize
const Sequelize = require('sequelize')

//Setting koneksi ke database
const sequelize = new Sequelize('rakit' , 'root', 'root',
    {
        host: 'localhost',
        dialect: 'mysql'
    })

//Export module
module.exports = sequelize;