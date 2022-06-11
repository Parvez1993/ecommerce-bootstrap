const express = require("express");
const {
  getProducts,
  getSingleProducts,
  uploadProduct,
  getOwnerProduct,
  getEditProducts,
} = require("../controllers/ProductsController");
const auth = require("../middleware/auth");
const productRouter = express.Router();

productRouter.route("/").get(getProducts);
productRouter.route("/").post(auth, uploadProduct);
productRouter.route("/getownerproduct").get(auth, getOwnerProduct);
productRouter.route("/getownerproduct/:id").get(auth, getEditProducts);
productRouter.route("/:slug").get(getSingleProducts);

module.exports = productRouter;
