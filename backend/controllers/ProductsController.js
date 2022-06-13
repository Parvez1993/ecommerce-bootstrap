const Product = require("../models/ProductModels.js");
const NotFoundError = require("../errors/not-found.js");

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
  const productfromUser = await Product.find({ _id: req.params.id });

  if (productfromUser) {
    res.status(200).send(productfromUser);
  }
};

const ownereditProduct = async (req, res) => {
  const productfromUser = await Product.findById(req.params.id);

  if (!productfromUser) {
    throw new NotFoundError("No product Found");
  } else {
    productfromUser.name = req.body.name || productfromUser.name;
    productfromUser.price = req.body.price || productfromUser.price;
    productfromUser.category = req.body.category || productfromUser.category;
    productfromUser.instock = req.body.instock || productfromUser.instock;
    productfromUser.description =
      req.body.description || productfromUser.description;
    productfromUser.coupon = req.body.coupon || productfromUser.coupon;
    productfromUser.discount = req.body.discount || productfromUser.discount;
    productfromUser.discountlimit =
      req.body.discountlimit || productfromUser.discountlimit;

    const saveProduct = await productfromUser.save();
    res.status(200).json(saveProduct);
  }
};

module.exports = {
  getProducts,
  getSingleProducts,
  uploadProduct,
  getOwnerProduct,
  getEditProducts,
  ownereditProduct,
};
