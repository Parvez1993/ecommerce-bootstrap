const express = require("express");
const authController = require("../controllers/authController.js");

const userRouter = express.Router();

userRouter.route("/register").post(authController.register);

module.exports = userRouter;
