const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  movie: {
    type: String,
    required: true,
  },
  seat: [{ type: String, required: true }],
  hall: {
    type: Number,
    required: true,
  },
  formofpayment: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Order", orderSchema);
