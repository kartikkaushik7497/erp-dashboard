const mongoose = require("mongoose");

const SaleSchema = new mongoose.Schema({
  product: { type: String, required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Sale", SaleSchema);
