const {
  response200,
  response404,
  response500,
  response400,
  response401,
} = require("../config/response");
const Media = require("../models/Media");
const { ObjectId } = require("mongodb");

const postMedia = async (req, res) => {
  try {
    const { title, description, type, data } = req.body;
    const newImage = new Media({
      title,
      description,
      data,
      type,
      created_at: new Date(),
    });
    const dataToSave = await newImage.save();
    if (dataToSave) res.status(200).json(response200);
  } catch (error) {
    res.status(500).json(response500);
  }
};

const getAllMedia = async (req, res) => {
  try {
    const medias = await Media.find().select(
      "title type description created_at"
    );
    return res.status(200).json({
      ...response200,
      data: medias,
    });
  } catch (error) {
    return res.status(500).json(response500);
  }
};

const getMedia = async (req, res) => {
  const imageId = req.params.imageId;

  try {
    const image = await Media.findById(imageId);

    if (!image) {
      return res.status(404).json(response404);
    }

    const imageBuffer = Buffer.from(image.data.split(",")[1], "base64");
    res.writeHead(200, {
      "Content-Type": "image/png",
      "Content-Length": imageBuffer.length,
    });
    res.end(imageBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).json(response500);
  }
};

const updateMedia = async (req, res) => {
  try {
    const imageId = req.params.imageId;
    if (!imageId) return res.status(401).json(response401);

    const image = await Media.findOne({ _id: new ObjectId(imageId) });
    if (image) {
      try {
        const data = await Media.updateOne(
          { _id: new ObjectId(imageId) },
          { $set: req.body }
        );
        if (data) return res.status(200).json(response200);
        return res.status(400).json(response400);
      } catch (error) {
        res.status(500).json(response500);
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(response500);
  }
};

const deleteMedia = async (req, res) => {
  try {
    const imageId = req.params.imageId.toString().trim();
    if (!imageId) return res.status(401).json(response401);
    const data = await Media.findOneAndDelete({
      _id: new ObjectId(imageId),
    });
    if (data) return res.status(200).json(response200);
    return res.status(400).json(response400);
  } catch (error) {
    res.status(500).json(response500);
  }
};

module.exports = {
  postMedia,
  getMedia,
  getAllMedia,
  deleteMedia,
  updateMedia,
};
