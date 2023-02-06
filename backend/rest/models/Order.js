const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  movieTitle: {
    type: String,
    required: true,
  },
  seat: { type: Number, required: true },
  hall: {
    type: Number,
    required: true,
  },
  formofpayment: {
    type: String,
    required: true,
  },
  day: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },

  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Users",
  },
});

module.exports = mongoose.model("Order", orderSchema);
