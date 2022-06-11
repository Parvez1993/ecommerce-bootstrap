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

const uploadProduct = async (req, res) => {
  const product = await Product.create({
    name: req.body.name,
    slug: req.body.slug,
    img: req.body.img,
    category: req.body.category,
    description: req.body.description,
    price: req.body.price,
    instock: req.body.instock,
    discount: req.body.discount,
    discountlimit: req.body.discountlimit,
    storename: req.body.storename,
    owner: req.user.userId,
  });
  res.send(product);
};

const getOwnerProduct = async (req, res) => {
  const productfromUser = await Product.find({ owner: req.user.userId });

  if (productfromUser) {
    res.status(200).send(productfromUser);
  }
};

const getEditProducts = async (req, res) => {
  const productfromUser = await Product.find({ product: req.params.id });

  if (productfromUser) {
    res.status(200).send(productfromUser);
  }
};

module.exports = {
  getProducts,
  getSingleProducts,
  uploadProduct,
  getOwnerProduct,
};
