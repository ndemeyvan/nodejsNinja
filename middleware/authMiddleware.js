const jwt = require("jsonwebtoken");


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


module.exports = {
  requireAuth,
};