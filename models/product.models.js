const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
      required:true
    },
  ],
  description: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, min: 0, max: 5, default: 0, required: true },
  images: [{ type: String, required: true }],
});

const Product = mongoose.model("products", productSchema);

module.exports = Product;
