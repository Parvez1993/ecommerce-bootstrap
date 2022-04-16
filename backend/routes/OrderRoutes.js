const express = require("express");
const { getOrder, getOrderbyId } = require("../controllers/OrderController");
const Order = require("../models/orderModels");
const orderRouter = express.Router();

orderRouter.route("/").post(getOrder);

orderRouter.route("/:id").get(getOrderbyId);

module.exports = orderRouter;
