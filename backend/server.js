const data = require("./data.js");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const discount = require("./discount");
dotenv.config();
const express = require("express");
const app = express();

const DB = process.env.DATABASE_LOCAL;

mongoose
  .connect(DB, () => {
    console.log("connected");
  })
  .catch((err) => console.log(err));

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/products", function (req, res) {
  res.send(data);
});

app.get("/products/:slug", function (req, res) {
  let product = data.find((item) => item.slug === req.params.slug);
  res.send(product);
});

app.get("/cartItems/:id", function (req, res) {
  const params = req.params.id;
  let product = data.find((item) => item._id === params);
  res.send(product);
});

//get discount

app.get("/discount", function (req, res) {
  res.send(discount);
});

const port = process.env.PORT || 8000;

app.listen(8000, () => {
  console.log("connected");
});
