const Store = require("../models/StoreModels");

const createStore = async (req, res) => {
  const store = await Store.create({
    name: req.body.name,
    owner: req.user.userId,
  });

  res.status(200).json(store);
};

const getStoreName = async (req, res) => {
  const store = await Store.find({ owner: req.user.userId });

  res.status(200).json(store);
};

module.exports = { createStore, getStoreName };
