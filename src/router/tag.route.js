const express = require("express");
const {
  getTags,
  postTag,
  updateTag,
  deleteTag,
} = require("../controller/tag.controller");
const validation = require("../middleware/validation");
const { tagSchema } = require("../schemas/tag.schema");
const auth = require("../middleware/auth");
const route = express();

// GET
route.get("/tags", getTags);

// POST
route.post("/tag", auth, validation(tagSchema), postTag);

// PUT
route.put("/tag/:tagId", auth, validation(tagSchema), updateTag);

// Delete
route.delete("/tag/:tagId", auth, deleteTag);

module.exports = route;
