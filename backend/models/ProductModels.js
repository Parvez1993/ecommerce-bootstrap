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
    },
    instock: {
      type: Number,
    },
    reviews: [
      {
        name: { type: String },
        rating: { type: Number },
        comment: { type: String },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        default: {},
      },
    ],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numberofrating: {
      type: Number,
      default: 0,
    },
    coupon: {
      type: String,
      default: null,
    },
    discount: {
      type: Number,
    },
    discountlimit: {
      type: Number,
    },
    totalSale: {
      type: Number,
      default: 0,
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
