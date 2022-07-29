const express = require("express");
const authController = require("../controllers/authController.js");
const auth = require("../middleware/auth.js");

const userRouter = express.Router();

userRouter.route("/register").post(authController.register);
userRouter.route("/login").post(authController.login);
userRouter.route("/editvendor").put(auth, authController.editVendor);
userRouter.route("/editAffiliator").put(auth, authController.editAffiliator);
userRouter.route("/getUsers").get(auth, authController.getAllUsers);

module.exports = userRouter;
