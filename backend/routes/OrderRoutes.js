const express = require("express");
const {
  getOrder,
  getOrderbyId,
  getOrderAfterPayment,
} = require("../controllers/OrderController");
const Order = require("../models/orderModels");
const orderRouter = express.Router();

orderRouter.route("/").post(getOrder);

orderRouter.route("/:id").get(getOrderbyId);
orderRouter.route("/:id/pay").put(getOrderAfterPayment);

module.exports = orderRouter;
