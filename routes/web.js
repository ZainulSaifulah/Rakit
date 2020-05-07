//Import module yang dibutuhkan
const express = require('express')
const bcrypt = require('bcrypt');
const router = express.Router();

//Import model yang akan digunakan
const User = require('../models/User')
const Service = require('../models/Service')
const Doctor = require('../models/Doctor')


//Route halaman utama
router.get('/', async (req, res) => {
    services = await Service.findAndCountAll()
    doctors = await Doctor.findAndCountAll()
    users = await User.findAndCountAll() 

    res.render('sites/index', {services, doctors, users})
})

//Route Service
router.get('/services', (req, res) => {
    Service.findAll().then((services) => {
        res.render('../views/sites/service/index', { services })
    }).catch((error) => {
        console.log(error);
    })
})

router.get('/services/create', (req, res) => {
    res.render('../views/sites/service/create')
})

router.get('/services/:id/edit', (req, res) => {
    Service.findByPk(req.params.id).then((service) => {
        res.render('../views/sites/service/edit', {service: service})
    }).catch((error) => {
        console.log(error);
    })
})

router.post('/services/:id/edit', (req, res) => {
    let data = {
        name: req.body.name,
        type: req.body.type,
        status: req.body.status,
    };

    Service.update(data, {
        where: {
            id: req.params.id
      }
    }).then((user) => {
        res.redirect('/services');
    }).catch((error) => {
        console.log(error);
    })
})

router.get('/services/:id/delete', (req, res) => {
    Service.destroy({
        where: {
          id: req.params.id
        }
      }).then((service) => {
        res.redirect('/services');        
    }).catch((error) => {
        console.log(error);
    })
})

router.post('/services', (req, res) => {
    let data = {
        name: req.body.name,
        type: req.body.type,
        status: req.body.status,
    };

    Service.create(data).then((user) => {
        res.redirect('/services');
    }).catch((error) => {
        console.log(error);
    })
})

//Route User
router.get('/users', (req, res) => {
    User.findAll().then((users) => {
        res.render('../views/sites/user/index', { users })
    }).catch((error) => {
        console.log(error);
    })
})

router.get('/users/create', (req, res) => {
    res.render('../views/sites/user/create')
})

router.post('/users', (req, res) => {
    let data = {
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)) 
    };

    User.create(data).then((user) => {
        res.redirect('/users');
    }).catch((error) => {
        console.log(error);
    })
})

router.get('/users/:id/edit', (req, res) => {
    User.findByPk(req.params.id).then((user) => {
        res.render('../views/sites/user/edit', {user})
    }).catch((error) => {
        console.log(error);
    })
})

router.post('/users/:id/edit', (req, res) => {
    let data = {
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    };

    User.update(data, {
        where: {
            id: req.params.id
      }
    }).then((user) => {
        res.redirect('/users');
    }).catch((error) => {
        console.log(error);
    })
})

router.get('/users/:id/delete', (req, res) => {
    User.destroy({
        where: {
          id: req.params.id
        }
      }).then((service) => {
        res.redirect('/users');        
    }).catch((error) => {
        console.log(error);
    })
})


//Route Doctor 
router.get('/doctors', (req, res) => {
    Doctor.findAll({
        include: [{ model: Service}]
    }).then((doctors) => {
        res.render('../views/sites/doctor/index', { doctors })
    }).catch((error) => {
        console.log(error);
    })
})

router.get('/doctors/create', (req, res) => {
    Service.findAll().then((services) => {
        res.render('../views/sites/doctor/create', {services})
    }).catch((error) => {
        console.log(error);
    })
})

router.post('/doctors', (req, res) => {
    let data = {
        name: req.body.name,
        gender: req.body.gender,
        address: req.body.address,
        serviceId: req.body.serviceId
    };

    Doctor.create(data).then((docotr) => {
        res.redirect('/doctors');
    }).catch((error) => {
        console.log(error);
    })
})

router.get('/doctors/:id/edit', async (req, res) => {
    let services = await Service.findAll()
    let doctor = await Doctor.findOne({
        where: {id: req.params.id},
        include: [{ model: Service}]
    })

    res.render('../views/sites/doctor/edit', {doctor, services})
})

router.post('/doctors/:id/edit', (req, res) => {
    let data = {
        name: req.body.name,
        gender: req.body.gender,
        address: req.body.address,
        serviceId: req.body.serviceId
    };

    Doctor.update(data, {
        where: {
            id: req.params.id
      }
    }).then((doctor) => {
        res.redirect('/doctors');
    }).catch((error) => {
        console.log(error);
    })
})

router.get('/doctors/:id/delete', (req, res) => {
    Doctor.destroy({
        where: {
          id: req.params.id
        }
      }).then((doctor) => {
        res.redirect('/doctors');        
    }).catch((error) => {
        console.log(error);
    })
})


module.exports = router;