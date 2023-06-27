const mongoose = require("mongoose");


const EcommerceProductsSchema = new mongoose.Schema(
  {
    title: { type: String, require: true }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const EcommerceProducts = mongoose.model("product", EcommerceProductsSchema);
module.exports = EcommerceProducts;