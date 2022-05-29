const express = require("express");
const { createStore, getStoreName } = require("../controllers/storeController");

const storeRouter = express.Router();

storeRouter.route("/").post(createStore);
storeRouter.route("/").get(getStoreName);

module.exports = storeRouter;
