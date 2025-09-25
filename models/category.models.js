const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "products" }],
});

const Category = mongoose.model("categories", categorySchema);

module.exports = Category;
