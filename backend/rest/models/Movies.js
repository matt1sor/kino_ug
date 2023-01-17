const mongoose = require("mongoose");

const nameSchema = new mongoose.Schema({
  name: String,
  lastname: String,
});

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
  director: { type: nameSchema, required: true },
  actors: { type: [nameSchema], required: true },
  time: {
    type: Number,
    required: true,
  },
  poster: {
    type: String,
  },
  trailer: {
    type: String,
  },
});

module.exports = mongoose.model("Movies", moviesSchema);
