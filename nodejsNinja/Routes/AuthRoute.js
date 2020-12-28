const express = require('express');
const Authcontroller = require('../controller/AuthController')
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();


router.post('/register',Authcontroller.register); 

router.post('/login',Authcontroller.login); 

router.get("/users", authMiddleware.requireAuth, Authcontroller.getAllUser);

router.delete('/users/:id', Authcontroller.deleteUser)

router.delete("/logout/", authMiddleware.requireAuth, Authcontroller.logOut);

// router.get("/checkUser/", authMiddleware.requireAuth, Authcontroller.checkUser);



module.exports = router;