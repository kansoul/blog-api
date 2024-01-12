const {
  response200,
  response404,
  response500,
  response401,
  response400,
} = require("../config/response");
const Tag = require("../models/Tag");
const { ObjectId } = require("mongodb");

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

const updateTag = async (req, res) => {
  try {
    const tagId = req.params.tagId;
    if (!tagId) return res.status(401).json(response401);

    const tag = await Tag.findOne({ _id: new ObjectId(tagId) });
    if (tag) {
      try {
        const data = await Tag.updateOne(
          { _id: new ObjectId(tagId) },
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

const deleteTag = async (req, res) => {
  try {
    const tagId = req.params.tagId.toString().trim();
    if (!tagId) return res.status(401).json(response401);
    const data = await Tag.findOneAndDelete({
      _id: new ObjectId(tagId),
    });
    if (data) return res.status(200).json(response200);
    return res.status(400).json(response400);
  } catch (error) {
    res.status(500).json(response500);
  }
};

module.exports = {
  getTags,
  postTag,
  updateTag,
  deleteTag,
};
