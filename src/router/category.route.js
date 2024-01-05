const express = require("express");
const {
  getCategories,
  getCategory,
  postCategory,
} = require("../controller/category.controller");
const validation = require("../middleware/validation");
const { categorySchema } = require("../schemas/category.schema");
const route = express();

// GET
route.get("/categories", getCategories);
route.get("/category/:slug", getCategory);

// POST
route.post("/category", validation(categorySchema), postCategory);

module.exports = route;