const express = require("express");
const {
  getProducts,
  getSingleProducts,
} = require("../controllers/ProductsController");
const productRouter = express.Router();

productRouter.route("/").get(getProducts);

productRouter.route("/:slug").get(getSingleProducts);

module.exports = productRouter;
