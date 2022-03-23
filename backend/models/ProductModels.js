const mongoose = require("mongoose");
var validator = require("validator");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide name"],
      minlength: 3,
      maxlength: 20,
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      required: [true, "Please provide slug"],
      minlength: 3,
      maxlength: 20,
      trim: true,
      unique: true,
    },
    img: {
      type: String,
      required: [true, "Please provide image"],
    },
    brand: {
      type: String,
      required: [true, "Please provide brand"],
    },
    category: {
      type: String,
      required: [true, "Please provide category"],
    },
    description: {
      type: String,
      required: [true, "Please provide description"],
    },
    stock: { type: Number, required: [true, "Please enter stock"] },
    rating: {
      type: Number,
      default: 0,
    },
    numberOfRatings: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
