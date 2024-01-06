const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  featuredMedia: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Media",
    required: true,
  },
  status: { type: String, enum: ["PUBLISH", "PRIVATE"], required: true },
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

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
