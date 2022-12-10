const express = require("express");
const bodyparser = require("body-parser");
const cookieparser = require("cookie-parser");
const { connectdatabase } = require("./config/Database");
const dotenv = require("dotenv");
const user = require("./Routes/Userroutes");
const posts = require("./Routes/Postroute");
const cloudinary = require("cloudinary");

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieparser());
dotenv.config();
connectdatabase();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
app.use("/api/v1", user);
app.use("/api/v1", posts);
app.listen(4000, () => {
  console.log(`server is working on 4000`);
});
