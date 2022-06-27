const Product = require("../models/ProductModels.js");
const NotFoundError = require("../errors/not-found.js");
const User = require("../models/UserModels.js");
const Affiliate = require("../models/AffiliateModels.js");
const getProducts = async (req, res) => {
  const products = await Product.find();
  res.send(products);
};

const getSingleProducts = async (req, res) => {
  const slug = req.params.slug;
  let user = await User.findById(req.query.id);
  let product = await Product.findOne({ slug: req.params.slug });
  if (user) {
    if (product) {
      res.send(product);
      let affiliateInfo = {
        amount: (product.price * 10) / 100,
        owner: req.query.id,
      };
      const affiliate = new Affiliate(affiliateInfo);
      affiliate.save();
    } else {
      res.status(404).send({ msg: "Product Not Found" });
    }
  } else {
    let product = await Product.findOne({ slug: req.params.slug });
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ msg: "Product Not Found" });
    }
  }

  // res.send(product);
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

const updateReviews = async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user.userId.toString()
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    } else {
      let userdetail = await User.findById(req.user.userId).select("-password");

      const review = {
        name: userdetail.name,
        rating: Number(rating),
        comment,
        user: req.user.userId,
      };

      product.reviews.push(review);

      product.numberofrating = product.reviews.length;

      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length; //5

      await product.save();
      res.status(201).json({ message: "Review added" });
    }
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
};

module.exports = {
  getProducts,
  getSingleProducts,
  uploadProduct,
  getOwnerProduct,
  getEditProducts,
  ownereditProduct,
  updateReviews,
};
