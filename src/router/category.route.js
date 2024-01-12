const express = require("express");
const {
  getCategories,
  getCategory,
  postCategory,
  updateCategory,
  deleteCategory,
} = require("../controller/category.controller");
const validation = require("../middleware/validation");
const { categorySchema } = require("../schemas/category.schema");
const auth = require("../middleware/auth");
const route = express();

// GET
route.get("/categories", getCategories);
route.get("/category/:slug", getCategory);

// POST
route.post("/category", auth, validation(categorySchema), postCategory);

// PUT
route.put(
  "/category/:categoryId",
  auth,
  validation(categorySchema),
  updateCategory
);

// Delete
route.delete("/category/:categoryId", auth, deleteCategory);

module.exports = route;
