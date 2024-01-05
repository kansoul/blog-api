const { PUBLISH } = require("../config/app");
const { response200, response404, response500 } = require("../config/response");
const Post = require("../models/Post");

const getPosts = async (req, res) => {
  try {
    const customQuery = req.customQuery;
    const posts = await Post.find(customQuery)
      .populate("tags")
      .populate("category")
      .populate("author");
    return res.status(200).json({
      ...response200,
      data: posts,
    });
  } catch (error) {
    return res.status(500).json(response500);
  }
};

const getPost = async (req, res) => {
  try {
    const slug = req.params.slug;
    if (!slug) return res.status(404).json(response404);
    const post = await Post.findOne({ slug });
    return res.status(200).json({
      ...response200,
      data: post,
    });
  } catch (error) {
    return res.status(500).json(response500);
  }
};

const postPost = async (req, res) => {
  try {
    const { author, category, title, content, featuredMedia, slug, tags } =
      req.body;
    const status = PUBLISH;

    const data = new Post({
      author,
      category,
      status,
      title,
      content,
      created_at: new Date(),
      featuredMedia,
      slug,
      tags,
      updated_at: new Date(),
    });

    const dataToSave = await data.save();
    if (dataToSave) res.status(200).json(response200);
  } catch (error) {
    res.status(500).json(response500);
  }
};

const updatePost = (req, res) => {};

const deletePost = (req, res) => {};

module.exports = {
  getPosts,
  getPost,
  postPost,
};
