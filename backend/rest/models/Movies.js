const mongoose = require("mongoose");
require("mongoose-type-url");
const moviesSchema = new mongoose.Schema({
  title: {
    unique: true,
    type: String,
    required: true,
    trim: true,
  },
  genre: {
    type: String,
    required: true,
  },
  relasedate: {
    type: Date,
    required: true,
  },
  director: { type: String, required: true },
  poster: { type: String, required: true },

  duration: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Movies", moviesSchema);
