const { response200, response404, response500 } = require("../config/response");
const Tag = require("../models/Tag");

const getTags = async (req, res) => {
  try {
    const tags = await Tag.find();
    return res.status(200).json({
      ...response200,
      data: tags,
    });
  } catch (error) {
    return res.status(500).json(response500);
  }
};

const postTag = async (req, res) => {
  try {
    const { name, featuredMedia, slug } = req.body;
    const data = new Tag({
      name,
      featuredMedia,
      slug,
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
  getTags,
  postTag,
};
