const userModel = require("../models/userModel");
//use for json web token
const jwt = require("jsonwebtoken");
const register = (req, res) => {
  const { email, password } = req.body;
  const user = new userModel({ email, password });
  user
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        user: user,
        jwt: createToken(result._id),
      });
    })
    .catch((err) => {
      console.log(err.message, err.code);
      if (err.code === 11000) {
        res.send(`The email : ${req.body.email} already exit `);
      }
      res.send(err.message);
    });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    userModel.login(email, password).then((result) => {
      res.status(201).json({
        user: result,
        jwt: createToken(result._id),
      });
    });
  } catch (error) {
    res.status(401).json({});
    console.log("Error", error);
  }
};

const deleteUser = (req, res) => {
  userModel.findByIdAndRemove({ _id: req.params.id }).then((result) => {
    res.send(result);
  });
};

const getAllUser = (req, res) => {
  userModel.find().then((result) => {
    res.send(result);
  });
};

/// generate the json web token
const createToken = (id) =>
  jwt.sign({ id: id }, "authentication_token_secret", {
    expiresIn: maxAge,
  });

const maxAge = 3 * 24 * 60 * 60 * 1000;

module.exports = {
  register,
  login,
  getAllUser,
  deleteUser,
};
