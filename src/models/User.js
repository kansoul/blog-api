const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  token: { type: String },
  role: { type: String, enum: ["AUTHOR", "ADMIN"], required: true },
  email: { type: String, required: true, unique: true },
  name: { type: String },
  avatar: { type: String },
  created_at: { type: Date, default: Date.now },
  information: {
    firstName: { type: String },
    lastName: { type: String },
    country: { type: String },
    city: { type: String },
    address: { type: String },
    phoneNumber: { type: String },
    birthday: { type: Date },
    organization: { type: String },
    companyName: { type: String },
    role: { type: String },
    department: { type: String },
    zipCode: { type: String },
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
