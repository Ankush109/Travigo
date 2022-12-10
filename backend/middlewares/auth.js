const User = require("../Models/Usermodel");
const jwt = require("jsonwebtoken");
const { nextTick } = require("process");
exports.isauthenticated = async (req, res, next) => {
  // getting the token from cookies to get the logged in user status
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({
      message: "please login first",
    });
  }
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded._id); //<-- the logged in user id can now be accessed via req.user._id
  next();
};
