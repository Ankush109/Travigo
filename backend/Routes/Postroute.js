const express = require("express");
const {
  usercreateposts,
  getallposts,

  deletesinglepost,
  updatecaption,
  addcomment,
  deletecomment,
} = require("../Controllers/Postcontroller");
const { isauthenticated } = require("../middlewares/auth");
const router = express.Router();
router.route("/post/upload").post(isauthenticated, usercreateposts);
router.route("/posts").get(getallposts);

router

  .route("/post/:id")
  .put(isauthenticated, updatecaption)
  .delete(isauthenticated, deletesinglepost);
router
  .route("/post/comment/:id")
  .post(isauthenticated, addcomment)
  .delete(isauthenticated, deletecomment);
module.exports = router;
