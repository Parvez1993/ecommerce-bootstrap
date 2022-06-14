const express = require("express");
const {
  rechargeVirtualCard,
  paymentWithCard,
} = require("../controllers/VirtualController");
const virtualCart = express.Router();

virtualCart.route("/payment").put(rechargeVirtualCard);
virtualCart.route("/payment/:id").put(paymentWithCard);

module.exports = virtualCart;
