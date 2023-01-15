const mongoose = require("mongoose");

const nameSchema = new mongoose.Schema({
  name: String,
  lastname: String,
});

const moviesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  relasedate: {
    type: Date,
    required: true,
  },
  director: { nameSchema, required: true },
  actors: [{ nameSchema, required: true }],
  time: {
    type: Number,
    required: true,
  },
  poster: {
    type: Image,
  },
  trailer: {
    type: String,
  },
});

module.exports = mongoose.model("Movies", moviesSchema);
