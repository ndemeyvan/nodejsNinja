const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//bcrypt is a packages hepl us to crypting user client password
const bcrypt = require("bcrypt");
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
  bcrypt.genSalt().then((saltResult) => {
    bcrypt.hash(this.password, saltResult).then((cryptedResult) => {
      this.password = cryptedResult;
      next();
    });
  });
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};
const user = mongoose.model("users", userSchema);
module.exports = user;
