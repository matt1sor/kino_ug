const mongoose = require("mongoose");

const repetoireSchema = new mongoose.Schema({
  movieTitle: {
    type: String,
    required: true,
  },
  day: {
    type: Date,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
  hall: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("repetoire", repetoireSchema);
