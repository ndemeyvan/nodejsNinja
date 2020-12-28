const jwt = require("jsonwebtoken");
const User = require('../models/userModel');
const requireAuth = (req, res, next) => {
  const token = req.body.jwt;
  ///verifier si le token existe
  if (token) {
    jwt.verify(token, "authentication_token_secret", (err, decodedToken) => {
      if (err) {
        console.log("Error : ", err);
        res.send("Token is not valid");
      } else {
        console.log("decodedToken :", decodedToken);
        next();
      }
    });
  } else {
    res.send("No token provide");
  }
};

// check current user
const checkUser = (req, res, next) => {
  const token = req.body.jwt;
  if (token) {
    jwt.verify(
      token,
      "authentication_token_secret",
      async (err, decodedToken) => {
        if (err) {
            res.locals.user = null;
             console.log("The actual user is : ", res.locals.user);
          next();
        } else {
          let user = await User.findById(decodedToken.id);
            res.locals.user = user;
            console.log('The actual user is : ',user);
          next();
        }
      }
    );
  } else {
      res.locals.user = null;
       console.log("The actual user is : ", res.locals.user);
    next();
  }
};

module.exports = {
  requireAuth,
  checkUser,
};
