//Import module yang dibutuhkan 
const express = require('express')
const bodyParser = require('body-parser')
const sequelize = require('./config/db')
const path = require("path");

//Inisialisasi express
const app = express()

//Import model sequelize
const User = require('./models/User');
const Service = require('./models/Service');
const Doctor = require('./models/Doctor');

//Inisialisasi body-parser
app.use(bodyParser.urlencoded({
    extended: true
  }));

//Inisialisasi template engine ejs
app.use(express.static('public'));
app.set("views", path.resolve(__dirname, "views"));
app.set('view engine', 'ejs');

//Import module untuk routing
const routes = require('./routes/web')
app.use('/', routes)

//Inisialisasi Aplikasi
app.listen(3000, () => {
    sequelize.sync(); //Perintah untuk syncronisasi table sequelize
    console.log('Server running in http://localhost:3000');
});