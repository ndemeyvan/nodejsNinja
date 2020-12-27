const express = require('express');
const Authcontroller = require('../controller/AuthController')
const router = express.Router();


router.post('/register',Authcontroller.register); 

router.post('/login',Authcontroller.login); 


module.exports = router;