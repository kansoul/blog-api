const { PUBLISH } = require("../config/app");
const { response200, response404, response500 } = require("../config/response");
const Blog = require("../models/Blog");

const getBlogs = async (req, res) => {
  try {
    const customQuery = req.customQuery;
    console.log(customQuery);
    const blogs = await Blog.find(customQuery)
      .populate("tags")
      .populate("category")
      .populate("author");
    return res.status(200).json({
      ...response200,
      data: blogs,
    });
  } catch (error) {
    return res.status(500).json(response500);
  }
};

const getBlog = async (req, res) => {
  try {
    const slug = req.params.slug;
    if (!slug) return res.status(404).json(response404);
    const blog = await Blog.findOne({ slug });
    return res.status(200).json({
      ...response200,
      data: blog,
    });
  } catch (error) {
    return res.status(500).json(response500);
  }
};

const createBlog = async (req, res) => {
  try {
    const {
      author,
      category,
      title,
      content,
      featuredMedia,
      slug,
      tags,
      status,
    } = req.body;

    const data = new Blog({
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

    const dataToSave = await data
      .save()
      .then(() => {
        return res.status(200).json(response200);
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    res.status(500).json(response500);
  }
};

const updatePost = (req, res) => {};

const deletePost = (req, res) => {};

module.exports = {
  getBlogs,
  getBlog,
  createBlog,
};
