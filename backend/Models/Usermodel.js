const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// defining userschema
const userschema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter your name"],
    maxlength: [30, "cannot exceed 30 characters"],
    minlength: [4, "cannot be less than 5 characters"],
  },
  email: {
    type: String,
    required: [true, "please enter your email"],
    unique: true,
    validate: [validator.isEmail, "please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "please enter your password"],
    minlength: [8, "password should be more than 8 characters"],
    select: false,
  },
  avatar: {
    public_id: String,
    url: String,
  },

  createdat: {
    type: Date,
    default: Date.now,
  },
  posts: [
    {
      type: mongoose.Types.ObjectId,
      ref: "post",
    },
  ],
  //   resetpassword: String,
  //   resetpasswordexpire: Date,
});
userschema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});
userschema.methods.matchpassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
userschema.methods.generatetoken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
};
module.exports = mongoose.model("user", userschema); // exporting user model
