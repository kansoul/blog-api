const { response200, response404, response500 } = require("../config/response");
const Category = require("../models/Category");

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

const updateCategory = (req, res) => {};

const deleteCategory = (req, res) => {};

module.exports = {
  getCategories,
  getCategory,
  postCategory,
};
