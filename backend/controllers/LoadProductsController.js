const Product = require("../models/ProductModels.js");
const data = require("../data");

const loadProducts = async (req, res) => {
  await Product.remove({});
  const products = await Product.insertMany(data);
  res.send(products);
};

module.exports = loadProducts;
