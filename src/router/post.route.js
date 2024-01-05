const express = require("express");
const cors = require("cors");
const auth = require("../middleware/auth");
const validation = require("../middleware/validation");
const postSchema = require("../schemas/post.schema");
const {
  getPosts,
  getPost,
  postPost,
} = require("../controller/post.controller");
const { checkInvalidParam } = require("../utils/helper");
const route = express.Router();

// GET
route.get("/posts", getPosts);

route.get("/posts/author/:authorId", (req, res) => {
  const { authorId } = req.params;
  checkInvalidParam(authorId, res);
  req.query = { author: authorId };
  return getPosts(req, res);
});

route.get("/posts/tag/:tagId", (req, res) => {
  const { tagId } = req.params;
  checkInvalidParam(tagId, res);
  req.query = { $in: [tags] };
  return getPosts(req, res);
});

route.get("/posts/category/:categoryId", (req, res) => {
  const { categoryId } = req.params;
  checkInvalidParam(categoryId, res);
  req.query = { category: categoryId };
  return getPosts(req, res);
});

route.get("/post/:slug", getPost);

// POST
route.post("/posts", validation(postSchema), postPost);

module.exports = route;
