const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    items: [
      {
        itemId: { type: String, required: true },
        itemPrice: { type: Number, required: true },
        amount: { type: Number, required: true }
      }
    ],
    shippingAddress: { type: mongoose.Schema.Types.Mixed },
  },
  {
    versionKey: false,
    timestamps: true
  }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;