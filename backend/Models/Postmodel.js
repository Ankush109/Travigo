const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  image: {
    public_id: String,
    url: String,
  },
  caption: String,
  location: String,
  costoftravel: Number,
  Heritagesites: String,
  accessofcommunity: String,
  Safety: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "user" },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("post", postSchema);
