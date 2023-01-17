const mongoose = require("mongoose");

const repetoireSchema = new mongoose.Schema(
  {
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Repetoire", repetoireSchema);
