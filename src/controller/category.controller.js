const {
  response200,
  response404,
  response500,
  response401,
  response400,
} = require("../config/response");
const Category = require("../models/Category");
const { ObjectId } = require("mongodb");

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).json({
      ...response200,
      data: categories,
    });
  } catch (error) {
    return res.status(500).json(response500);
  }
};

const getCategory = async (req, res) => {
  try {
    const slug = req.params.slug;
    if (!slug) return res.status(404).json(response404);
    const category = await Category.findOne({ slug });
    return res.status(200).json({
      ...response200,
      data: category,
    });
  } catch (error) {
    return res.status(500).json(response500);
  }
};

const postCategory = async (req, res) => {
  try {
    const { name, featuredMedia, slug, description } = req.body;
    const data = new Category({
      name,
      featuredMedia,
      slug,
      description,
      created_at: new Date(),
    });
    const dataToSave = await data.save();
    if (dataToSave) res.status(200).json(response200);
  } catch (error) {
    res.status(500).json(response500);
  }
};

const updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    if (!categoryId) return res.status(401).json(response401);

    const category = await Category.findOne({ _id: new ObjectId(categoryId) });
    if (category) {
      try {
        const data = await Category.updateOne(
          { _id: new ObjectId(categoryId) },
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

const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId.toString().trim();
    if (!categoryId) return res.status(401).json(response401);
    const data = await Category.findOneAndDelete({
      _id: new ObjectId(categoryId),
    });
    if (data) return res.status(200).json(response200);
    return res.status(400).json(response400);
  } catch (error) {
    res.status(500).json(response500);
  }
};

module.exports = {
  getCategories,
  getCategory,
  postCategory,
  updateCategory,
  deleteCategory,
};
