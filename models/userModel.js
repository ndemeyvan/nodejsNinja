const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//bcrypt sert a crypter le mpt de passe du client
const bcrypt = require('bcrypt');
///use validator package to validate if is email
const { isEmail } = require("validator");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Please enter a email"],
      unique: true,
      lowercase: true,
      validate: [isEmail, "Enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: [6, "The password min length is 6 caracters"],
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
    bcrypt.genSalt().then(saltResult=>{
        console.log('saltResult : ', saltResult);
        console.log('Client normal password : ',this.password);
        
         bcrypt.hash(this.password,saltResult).then(cryptedResult=>{
             console.log('CryptedResult : ',cryptedResult);
            this.password = cryptedResult;
            next();
        })
    })
  console.log("New user want to be save : ",this);
  
});

const user = mongoose.model("users", userSchema);
module.exports = user;
