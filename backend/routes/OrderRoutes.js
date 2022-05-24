const express = require("express");
const {
  getOrder,
  getOrderbyId,
  getOrderAfterPayment,
  StripePayment,
  getOrderofUser,
} = require("../controllers/OrderController");
const Order = require("../models/orderModels");
const orderRouter = express.Router();

orderRouter.route("/").post(getOrder);
orderRouter.route("/get").get(getOrderofUser);
orderRouter.route("/:id").get(getOrderbyId);
orderRouter.route("/:id/pay").put(getOrderAfterPayment);
orderRouter.route("/:id/payment").put(StripePayment);

module.exports = orderRouter;
