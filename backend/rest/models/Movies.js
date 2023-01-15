const mongoose = require("mongoose");

const moviesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: Image,
  },

  genre: {
    type: String,
    required: true,
  },
  relasedate: {
    type: Date,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Movies", moviesSchema);
