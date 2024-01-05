const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  featuredMedia: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Media",
    required: true,
  },
  status: { type: String, enum: ["publish", "private"], required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
