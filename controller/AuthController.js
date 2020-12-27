const userModel = require("../models/userModel");
//use for json web token
const jwt = require('jsonwebtoken');
const register = (req, res) => {

    const { email, password } = req.body;
    const user = new userModel({ email, password });
    user
      .save()
      .then((result) => {
        console.log(result);
        const token = createToken(result._id);
        res.status(201).json({
            user:user,
            token:token
        });
      })
      .catch((err) => {
        console.log(err.message ,err.code);
        if (err.code === 11000 ) {
            res.send(`The email : ${req.body.email} already exit `);
        }
        res.send(err.message);
        
      });

};

const login = (req, res) => {
  
};

const deleteUser = (req, res) => {
    userModel.findByIdAndRemove({_id: req.params.id}).then(result=>{
      
        res.send(result)
    })
};

const getAllUser = (req, res) => {
    userModel.find().then(result=>{
        
        res.send(result);

    })
};

/// generate the json web token
const createToken=(id) => jwt.sign({id:id},'authentication_token_secret',{
    expiresIn:maxAge,
});

const maxAge = 3 * 24 * 60 * 60;

module.exports = {
  register,
  login,
  getAllUser,
  deleteUser,
};
