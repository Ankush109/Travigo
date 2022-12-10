const express = require("express");

const {
  registername,
  loginuser,
  logoutuser,
  updatePassword,
  getuserprofile,
  getallusers,
  myprofile,
  getmypost,
  updateprofile,
  getuserposts,
} = require("../Controllers/Usercontroller");
const { isauthenticated } = require("../middlewares/auth");
const router = express.Router();
router.route("/register").post(registername);
router.route("/login").post(loginuser);
router.route("/logout").get(logoutuser);
router.route("/update/password").put(isauthenticated, updatePassword);
router.route("/user/:id").get(isauthenticated, getuserprofile);
router.route("/userposts/:id").get(isauthenticated, getuserposts);
router.route("/users").get(getallusers);
router.route("/me").get(isauthenticated, myprofile);
router.route("/me/posts").get(isauthenticated, getmypost);
router.route("/me/updateprofile").put(isauthenticated, updateprofile);
module.exports = router;
