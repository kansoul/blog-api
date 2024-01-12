const express = require("express");
const {
  getUser,
  getUsers,
  createUser,
  loginUser,
  logoutUser,
  updateInformationUser,
  deleteUser,
} = require("../controller/user.controller");
const validation = require("../middleware/validation");
const auth = require("../middleware/auth");
const {
  userSchema,
  loginSchema,
  informationSchema,
} = require("../schemas/user.schema");
const route = express();

// GET
route.get("/users", auth, getUsers);
route.get("/users/:id", auth, getUser);

// POST
route.post("/users", validation(userSchema), createUser);
route.post("/login", validation(loginSchema), loginUser);
route.post("/logout", auth, logoutUser);

// PUT
route.post(
  "/user/information/:userId",
  validation(informationSchema),
  updateInformationUser
);

// DELETE
route.delete("/user/:userId", auth, deleteUser);

module.exports = route;
