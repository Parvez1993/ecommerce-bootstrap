const express = require("express");
const {
  getProducts,
  getSingleProducts,
  uploadProduct,
  getOwnerProduct,
} = require("../controllers/ProductsController");
const auth = require("../middleware/auth");
const productRouter = express.Router();

productRouter.route("/").get(getProducts);
productRouter.route("/").post(auth, uploadProduct);
productRouter.route("/getownerproduct").get(auth, getOwnerProduct);
productRouter.route("/:slug").get(getSingleProducts);

module.exports = productRouter;
