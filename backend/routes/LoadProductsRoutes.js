const loadProducts = require("../controllers/LoadProductsController");
const express = require("express");
const loadProductsRoutes = express.Router();

loadProductsRoutes.route("/").get(loadProducts);

module.exports = loadProductsRoutes;
