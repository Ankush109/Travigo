const Post = require("../Models/Postmodel");
const User = require("../Models/Usermodel");
const cloudinary = require("cloudinary");
// creating new post funciton
const usercreateposts = async (req, res) => {
  console.log(req.user);

  try {
    const mycloud = await cloudinary.v2.uploader.upload(req.body.image, {
      folder: "posts",
      resource_type: "auto",
    });
    const newpostdata = {
      // new post data
      image: {
        public_id: mycloud.public_id,
        url: mycloud.secure_url,
      },
      location: req.body.location, // location
      costoftravel: req.body.costoftravel,
      Heritagesites: req.body.Heritagesites,
      Safety: req.body.Safety,

      accessofcommunity: req.body.accessofcommunity,
      caption: req.body.title,

      // will do the image uploading portion later with cloudinary
      // image: {
      //   avatar: {
      //     public_id: "sample_id",
      //     url: "sampleurl",
      //   },
      // },

      owner: req.user._id, // the logged in user
    };
    console.log("newpost  => " + newpostdata);
    const post = await Post.create(newpostdata); // creating a new post
    console.log(post);
    const user = await User.findById(req.user._id); // getting the user who is currently logged in
    user.posts.unshift(post._id); // pushing the post which the logged in user has created to its posts array[]
    await user.save(); // will add the post to the logged in user's posts array[]
    res.status(201).json({
      success: true,
      post,
      message: "post created",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get all posts function
const getallposts = async (req, res, next) => {
  const posts = await Post.find().populate("owner comments.user"); // getting all the posts
  res.status(200).json({
    success: true,
    posts: posts.reverse(),
  });
};

//  deletion of the post :-
const deletesinglepost = async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    // console.log(post.owner);

    if (post.owner.toString() !== req.user._id.toString()) {
      return res.status(500).json({
        success: false,
        message: "you are not the owner of the post",
      });
    }
    // console.log(post);

    if (!post) {
      return res.status(500).json({
        success: false,
        message: "post not found with this id",
      });
    }
    await cloudinary.v2.uploader.destroy(post.image.public_id);
    await post.remove();

    const user = await User.findById(req.user._id);

    const index = user.posts.indexOf(req.params.id);
    user.posts.splice(index, 1);
    await user.save();

    res.status(200).json({
      success: true,
      message: "deleted post",
    });
  } catch (error) {
    res.status(500).json({
      sucesss: false,
      message: error.message,
    });
  }
};
// updating the post :-
const updatecaption = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).json({
        sucesss: false,
        message: "post not found",
      });
    }
    if (post.owner.toString() !== req.user._id.toString()) {
      return res.status(500).json({
        success: false,
        message: "you are not the owner of the post",
      });
    }
    post.location = req.body.location;
    post.caption = req.body.caption;
    post.costoftravel = req.body.costoftravel;
    post.Heritagesites = req.body.Heritagesites;
    post.accessofcommunity = req.body.accessofcommunity;
    post.image = req.body.image;
    post.Safety = req.body.Safety;
    await post.save();
    res.status(200).json({
      success: true,
      message: "post updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const addcomment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    console.log(post);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "post not found",
      });
    }
    post.comments.push({
      user: req.user._id,
      comment: req.body.comment,
    });
    await post.save();
    res.status(201).json({
      success: true,
      message: "comment added to the post",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deletecomment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: true,
        message: "post not found",
      });
    }

    console.log("owner of the post  => " + post.owner);
    console.log("logged in user id =>" + req.user._id);
    // checking if the user wants to delete
    if (post.owner.toString() === req.user._id.toString()) {
      if (req.body.commentid == undefined) {
        return res.status(400).json({
          success: false,
          message: "comment id is required",
        });
      }
      post.comments.forEach((item, index) => {
        if (item._id.toString() === req.body.commentid.toString()) {
          return post.comments.splice(index, 1);
        }
      });
      await post.save();
      res.status(200).json({
        success: true,
        message: "selected comment has been deleted",
      });
    } else {
      post.comments.forEach((item, index) => {
        if (item.owner.toString() === req.user._id.toString()) {
          return post.comments.splice(index, 1);
        }
      });
      await post.save();
      return res.status(200).json({
        success: true,
        message: "you comment has deleted",
      });
    }
  } catch (error) {
    res.json({
      sucesss: false,
      message: error.message,
    });
  }
};
module.exports = {
  usercreateposts,
  getallposts,
  deletesinglepost,
  updatecaption,
  addcomment,
  deletecomment,
};
