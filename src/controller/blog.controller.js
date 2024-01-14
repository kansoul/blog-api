const {
  response200,
  response404,
  response500,
  response400,
  response401,
} = require("../config/response");
const Blog = require("../models/Blog");
const { ObjectId } = require("mongodb");

const getBlogs = async (req, res) => {
  try {
    const customQuery = req.customQuery;

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

    const dataToSave = await data.save();
    if (dataToSave) return res.status(200).json(response200);
  } catch (error) {
    res.status(500).json(response500);
  }
};

const updateBlog = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    if (!blogId) return res.status(401).json(response401);

    const blog = await Blog.findOne({ _id: new ObjectId(blogId) });
    if (blog) {
      try {
        const data = await Blog.updateOne(
          { _id: new ObjectId(blogId) },
          { $set: req.body }
        );
        if (data) return res.status(200).json(response200);
        return res.status(400).json(response400);
      } catch (error) {
        res.status(500).json(response500);
      }
    }
  } catch (error) {
    res.status(500).json(response500);
  }
};

const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.blogId.toString().trim();
    if (!blogId) return res.status(401).json(response401);
    const data = await Blog.findOneAndDelete({
      _id: new ObjectId(blogId),
    });
    if (data) return res.status(200).json(response200);
    return res.status(400).json(response400);
  } catch (error) {
    res.status(500).json(response500);
  }
};

module.exports = {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
};
