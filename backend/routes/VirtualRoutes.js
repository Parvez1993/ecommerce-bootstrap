const express = require("express");
const rechargeVirtualCard = require("../controllers/VirtualController");
const virtualCart = express.Router();

virtualCart.route("/payment").put(rechargeVirtualCard);

module.exports = virtualCart;
