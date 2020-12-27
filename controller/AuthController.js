const userModel = require("../models/userModel");

const register = (req, res) => {
    const { email, password } = req.body;
    const user = new userModel({ email, password });
    user
      .save()
      .then((result) => {
        console.log(result);
        res.status(201).json(user);
      })
      .catch((err) => {
        console.log(err.message ,err.code);
        // res.status(400).send(err.message ,err.code);
        if (err.code === 11000 ) {
            res.send(`The email : ${req.body.email} already exit `);
        }
        res.send(err.message);
        
      });
};

const login = (req, res) => {
  
};

module.exports = {
  register,
  login,
};
