const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  data: { type: String, required: true }, // Dữ liệu base64 của ảnh
  type: { type: String, enum: ["AVATAR", "MEDIA", "OTHER"], required: true },
  created_at: { type: Date, default: Date.now },
});

const Media = mongoose.model("Media", mediaSchema);

module.exports = Media;
