require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const MONGODB = process.env.DATABASE_URL;
const userRoute = require("./src/router/user.route");
const categoryRoute = require("./src/router/category.route");
const tagRoute = require("./src/router/tag.route");
const mediaRoute = require("./src/router/media.route");
const blogRoute = require("./src/router/blog.route");

mongoose.set("strictQuery", false);
mongoose.connect(MONGODB, { dbName: "blogs" }).then(() => {
  console.log("MongoDB Connected");
});

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

//Route
app.use("/api/v1", userRoute);
app.use("/api/v1", categoryRoute);
app.use("/api/v1", tagRoute);
app.use("/api/v1", mediaRoute);
app.use("/api/v1", blogRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err,
  });
});

module.exports = app;
