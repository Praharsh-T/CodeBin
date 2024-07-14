const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PasteSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Paste", PasteSchema);
