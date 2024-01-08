const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  token: { type: String },
  role: { type: String, enum: ["AUTHOR", "ADMIN"], required: true },
  email: { type: String, required: true, unique: true },
  name: { type: String },
  phoneNumber: { type: String },
  avatar: { type: String },
  created_at: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
