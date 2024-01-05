const express = require("express");
const {
  postMedia,
  getMedia,
  getAllMedia,
  deleteMedia,
} = require("../controller/media.controller");
const validation = require("../middleware/validation");
const { mediaSchema } = require("../schemas/media.schema");
const route = express.Router();

// GET
route.get("/media/:imageId", getMedia);
route.get("/media", getAllMedia);

// POST
route.post("/media", validation(mediaSchema), postMedia);

// DELETE
route.delete("/media/:imageId", deleteMedia);

module.exports = route;