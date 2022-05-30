const express = require("express");
const {
  getProducts,
  getSingleProducts,
  uploadProduct,
} = require("../controllers/ProductsController");
const auth = require("../middleware/auth");
const productRouter = express.Router();

productRouter.route("/").get(getProducts);
productRouter.route("/").post(auth, uploadProduct);
productRouter.route("/:slug").get(getSingleProducts);

module.exports = productRouter;
