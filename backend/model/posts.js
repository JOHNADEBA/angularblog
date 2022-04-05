const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogPost = new Schema(
  {
    header: { type: String, required: true },
    body: { type: String, required: true },
    date: Date,
  },
  { timestamps: true }
);

const Blogs = mongoose.model("BlogPosts", BlogPost);
module.exports = Blogs;
