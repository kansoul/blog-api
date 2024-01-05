const express = require("express");
const {
  getUser,
  getUsers,
  createUser,
} = require("../controller/user.controller");
const validation = require("../middleware/validation");
const { userSchema } = require("../schemas/user.schema");
const route = express();

// GET
route.get("/users", getUsers);
route.get("/users/:id", getUser);

// POST
route.post("/users", validation(userSchema), createUser);

module.exports = route;
