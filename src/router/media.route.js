const express = require("express");
const {
  postMedia,
  getMedia,
  getAllMedia,
  deleteMedia,
  updateMedia,
} = require("../controller/media.controller");
const validation = require("../middleware/validation");
const { mediaSchema, updateSchema } = require("../schemas/media.schema");
const auth = require("../middleware/auth");
const route = express.Router();

// GET
route.get("/media/:imageId", getMedia);
route.get("/media", auth, getAllMedia);

// POST
route.post("/media", auth, validation(mediaSchema), postMedia);

// PUT
route.put("/media/:imageId", auth, validation(updateSchema), updateMedia);

// DELETE
route.delete("/media/:imageId", auth, deleteMedia);

module.exports = route;
