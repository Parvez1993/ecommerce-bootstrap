const mongoose = require("mongoose");
var validator = require("validator");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    img: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    instock: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
    },
    numberofrating: {
      type: Number,
    },
    coupon: {
      type: String,
    },
    discount: {
      type: Number,
    },
    discountlimit: {
      type: Number,
    },
    totalSale: {
      type: Number,
    },
    storename: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "storename",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timesStamps: true,
  }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
