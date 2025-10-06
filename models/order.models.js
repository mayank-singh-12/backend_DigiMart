const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  products: [
    {
      type: {
        _id: false,
        title: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        discount: { type: Number, required: true },
        discountedPrice: { type: Number, required: true },
      },
      required: true,
    },
  ],
  shippingAddress: {
    type: {
      _id: false,
      name: { type: String, required: true },
      houseNo: { type: String, required: true },
      streetAddress: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
    },
    required: true,
  },
  subTotal: { type: Number, min: 0, default: 0, required: true },
  delivery: { type: Number, min: 0, default: 0, required: true },
  totalToPay: { type: Number, min: 0, default: 0, required: true },
});

const Order = mongoose.model("orders", orderSchema);

module.exports = Order;
