const express = require("express");
require("express-async-errors");
const data = require("./data.js");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const discount = require("./discount");
dotenv.config();

const loadProductsRoutes = require("./routes/LoadProductsRoutes");
const productRouter = require("./routes/ProductRoutes");
const userRouter = require("./routes/AuthRoutes");
const orderRouter = require("./routes/OrderRoutes.js");
const morgan = require("morgan");
const notFoundMiddleware = require("./middleware/notFoundMiddleware.js");
const errorMiddleware = require("./middleware/error-handler.js");

const auth = require("./middleware/auth.js");
const app = express();

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

const DB = process.env.DATABASE_LOCAL;

mongoose
  .connect(DB, () => {
    console.log("connected");
  })
  .catch((err) => console.log(err));

morgan("tiny");

app.use(express.json());

app.use("/api/v1/products", loadProductsRoutes);

app.use("/products", productRouter);

app.use("/users", userRouter);

app.use("/orders", auth, orderRouter);
// app.get("/products/:slug", function (req, res) {
//   let product = data.find((item) => item.slug === req.params.slug);
//   res.send(product);
// });

app.get("/cartItems/:id", function (req, res) {
  const params = req.params.id;
  let product = data.find((item) => item._id === params);
  res.send(product);
});

//get discount

app.get("/discount", function (req, res) {
  res.send(discount);
});

//category

app.get("/category/:cat", function (req, res) {
  let temp = [];
  let product = data.filter((item) => {
    if (item.category === req.params.cat) {
      return temp.push(item);
    }
  });
  res.send(product);
});

app.use(notFoundMiddleware);
app.use(errorMiddleware);

//unhandled error

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

const port = process.env.PORT || 8000;

app.listen(8000, () => {
  console.log("connected");
});
