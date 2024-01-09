const express = require("express");
const {
  getUser,
  getUsers,
  createUser,
  loginUser,
  logoutUser,
} = require("../controller/user.controller");
const validation = require("../middleware/validation");
const auth = require("../middleware/auth");
const { userSchema, loginSchema } = require("../schemas/user.schema");
const route = express();

// GET
route.get("/users", getUsers);
route.get("/users/:id", getUser);

// POST
route.post("/users", validation(userSchema), createUser);
route.post("/login", validation(loginSchema), loginUser);
route.post("/logout", auth, logoutUser);

module.exports = route;
