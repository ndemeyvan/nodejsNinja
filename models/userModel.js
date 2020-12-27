const mongoose = require("mongoose");
const Schema = mongoose.Schema;
///use validator package to validate if is email
const {isEmail} = require('validator');

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Please enter a email"],
      unique: [true, "This email is already use"],
      lowercase: true,
      validate:[isEmail,'Enter a valid email']
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: [6, "The password min length is 6 caracter"],
    },
  },
  { timestamps: true }
);

const user = mongoose.model("users", userSchema);
module.exports = user;
