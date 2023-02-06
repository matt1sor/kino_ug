const mongoose = require("mongoose");

const repetoireSchema = new mongoose.Schema(
  {
    movieId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movies",
    },
    day: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    seats: {
      type: [{ seat: Number, occupied: Boolean }],
      required: true,
      default: [
        { 1: false },
        { 2: false },
        { 3: false },
        { 4: false },
        { 5: false },
        { 6: false },
        { 7: false },
        { 8: false },
        { 9: false },
        { 10: false },
      ],
    },
    hall: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Repetoire", repetoireSchema);
