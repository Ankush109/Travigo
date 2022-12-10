const User = require("../Models/Usermodel");
const Post = require("../Models/Postmodel");
const cloudinary = require("cloudinary");
// making the register function for the users to register to the app
const registername = async (req, res) => {
  try {
    const { name, email, password, avatar } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "please fill all the fields" });
    }
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "user already exists" });
    }
    const myCloud = await cloudinary.v2.uploader.upload(avatar, {
      folder: "avatars",
    });
    user = await User.create({
      // creating new user in the database
      name,
      email,
      password,
      avatar: { public_id: myCloud.public_id, url: myCloud.secure_url },
    });

    const token = await user.generatetoken(); // same as login to get the user logged in the moment they have registered
    res
      .status(201)
      .cookie("token", token, {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      })
      .json({
        success: true,
        user,
        token,
      });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: error.message,
    });
  }
};
// function for user login
const loginuser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password"); // will take the password form the body as its set as select false in user schema
    if (!user) {
      // checking if a user exists or not
      return res.status(400).json({
        success: false,
        message: "user does not exist",
      });
    }
    // matching password if the password matches the possword of the created user in the database
    const ismatch = await user.matchpassword(password);
    if (!ismatch) {
      // if the password does not matches the one from te database
      return res.status(400).json({
        success: false,
        message: "incorrect password",
      });
    }
    const token = await user.generatetoken(); // generating a token for user sessions
    res
      .status(200)
      .cookie("token", token, {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // the jwt token will expire in the next 90 days
        httpOnly: true,
      })
      .json({
        success: true,
        user,
        token,
      });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const logoutuser = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      })
      .json({
        success: true,
        message: "loggedout",
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("+password");
    const { oldpassword, newpassword } = req.body;
    const ismatch = await user.matchpassword(oldpassword);
    console.log(ismatch);
    if (!ismatch) {
      return res.status(400).json({
        success: true,
        message: "incorrect password",
      });
    }
    user.password = newpassword;
    await user.save();
    res.status(200).json({
      success: true,
      message: "password updated",
    });
  } catch (error) {
    res.status(404).json({
      success: true,
      message: error.message,
    });
  }
};
// get all the post of the user
// const getuserposts = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     const posts = [];
//     for (let i = 0; i < user.posts.length; i++) {
//       const post = await Post.findById(user.posts[i]).populate(
//         " comments.user owner "
//       );
//       console.log(posts);
//       posts.push(post);
//     }

//     res.status(200).json({
//       success: true,
//       posts,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

const getuserprofile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("posts");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(200).json({
      success: true,
      message: error.message,
    });
  }
};
const myprofile = async (req, res) => {
  try {
    console.log(req.user._id);
    const user = await User.findById(req.user._id).populate("posts");
    console.log(user);
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
// update user profile
const updateprofile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { name, email, avatar } = req.body;
    if (name) {
      user.name = name;
    }
    if (email) {
      user.email = email;
    }

    if (avatar) {
      await cloudinary.v2.uploader.destroy(user.avatar.public_id);

      const myCloud = await cloudinary.v2.uploader.upload(avatar, {
        folder: "avatars",
      });
      user.avatar.public_id = myCloud.public_id;
      user.avatar.url = myCloud.secure_url;
    }
    await user.save();
    res.status(200).json({
      success: true,
      message: "Profile Updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getallusers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
const getuserposts = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const posts = [];
    for (let i = 0; i < user.posts.length; i++) {
      const post = await Post.findById(user.posts[i]).populate(
        "comments.user owner"
      );
      posts.push(post);
    }

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
const getmypost = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const posts = [];
    for (let i = 0; i < user.posts.length; i++) {
      const post = await Post.findById(user.posts[i]).populate(
        "comments.user owner"
      );
      posts.push(post);
    }

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  getuserprofile,
  registername,
  loginuser,
  updatePassword,
  logoutuser,
  getallusers,
  myprofile,
  getmypost,
  updateprofile,
  getuserposts,
};
