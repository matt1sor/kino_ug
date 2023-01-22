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
    // seats: {
    //   type: { seat: Number, occupied: Boolean },
    //   enum: [, "admin"],
    //   required: true,
    //   default: "user",
    // },
    hall: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Repetoire", repetoireSchema);
