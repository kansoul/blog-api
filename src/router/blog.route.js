const express = require("express");
const cors = require("cors");
const auth = require("../middleware/auth");
const validation = require("../middleware/validation");
const { blogSchema } = require("../schemas/blog.schema");

const {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controller/blog.controller");
const { checkInvalidParam } = require("../utils/helper");
const route = express.Router();

// GET
route.get("/blogs", getBlogs);

route.get("/blogs/author/:authorId", (req, res) => {
  const { authorId } = req.params;
  checkInvalidParam(authorId, res);
  req.customQuery = { author: authorId };
  return getBlogs(req, res);
});

route.get("/blogs/tag/:tagId", (req, res) => {
  const { tagId } = req.params;
  checkInvalidParam(tagId, res);
  req.customQuery = { tags: { $in: [tagId] } };
  return getBlogs(req, res);
});

route.get("/blogs/category/:categoryId", (req, res) => {
  const { categoryId } = req.params;
  checkInvalidParam(categoryId, res);
  req.customQuery = { category: categoryId };
  return getBlogs(req, res);
});

route.get("/blogs/recent", (req, res) => {
  req.limit = 7;
  return getBlogs(req, res);
});
route.get("/blogs/popular", (req, res) => {
  req.limit = 5;
  return getBlogs(req, res);
});

route.get("/blog/:slug", getBlog);

// POST
route.post("/blog", auth, validation(blogSchema), createBlog);

// PUT
route.put("/blog/:blogId", auth, validation(blogSchema), updateBlog);

// Delete
route.delete("/blog/:blogId", auth, deleteBlog);

module.exports = route;
