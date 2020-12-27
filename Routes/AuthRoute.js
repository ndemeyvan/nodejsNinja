const express = require('express');
const Authcontroller = require('../controller/AuthController')
const router = express.Router();


router.post('/register',Authcontroller.register); 

router.post('/login',Authcontroller.login); 

router.get('/users',Authcontroller.getAllUser)

router.delete('/users/:id',Authcontroller.deleteUser)



module.exports = router;