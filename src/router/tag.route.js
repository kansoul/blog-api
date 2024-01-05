const express = require("express");
const { getTags, postTag } = require("../controller/tag.controller");
const validation = require("../middleware/validation");
const { tagSchema } = require("../schemas/tag.schema");
const route = express();

// GET
route.get("/tags", getTags);

// POST
route.post("/tags", validation(tagSchema), postTag);

module.exports = route;
