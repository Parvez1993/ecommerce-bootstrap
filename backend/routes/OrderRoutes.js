const express = require("express");
const {
  getOrder,
  getOrderbyId,
  getOrderAfterPayment,
  StripePayment,
} = require("../controllers/OrderController");
const Order = require("../models/orderModels");
const orderRouter = express.Router();

orderRouter.route("/").post(getOrder);

orderRouter.route("/:id").get(getOrderbyId);
orderRouter.route("/:id/pay").put(getOrderAfterPayment);
orderRouter.route("/:id/payment").put(StripePayment);

module.exports = orderRouter;
