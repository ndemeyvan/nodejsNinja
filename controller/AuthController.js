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
        console.log(err);
        res.status(400).send(err);
        
      });
};

const login = (req, res) => {
  
};

module.exports = {
  register,
  login,
};
