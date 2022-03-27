const express = require("express");
const authController = require("../controllers/authController.js");

const userRouter = express.Router();

userRouter.route("/register").post(authController.register);
userRouter.route("/login").post(authController.login);

module.exports = userRouter;
