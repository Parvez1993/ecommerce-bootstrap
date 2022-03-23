const Product = require("../models/ProductModels.js");

const getProducts = async (req, res) => {
  const products = await Product.find();
  res.send(products);
};

const getSingleProducts = async (req, res) => {
  const slug = req.params.slug;
  let product = await Product.findOne({ slug });

  console.log("params", req.params.slug);
  res.send(product);
};

module.exports = { getProducts, getSingleProducts };
