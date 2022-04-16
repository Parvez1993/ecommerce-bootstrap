const Order = require("../models/orderModels");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors");

const getOrder = async (req, res) => {
  const newOrder = new Order({
    orderItems: req.body.orderItems.map((p) => ({ ...p, product: p._id })),
    shippingAddress: req.body.shippingAddress,
    paymentMethod: req.body.paymentMethod,
    paymentResult: req.body.paymentResult,
    itemsPrice: req.body.itemsPrice,
    shippingPrice: req.body.shippingPrice,
    taxPrice: req.body.taxPrice,
    totalPrice: req.body.totalPrice,
    user: req.user.userId,
  });

  const order = await newOrder.save();
  res.status(StatusCodes.CREATED).json({ msg: "New Order Created", order });
};

const getOrderbyId = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    res.status(StatusCodes.OK).json({ order });
  } else {
    throw new NotFoundError("No such order exists");
  }
};

module.exports = { getOrder, getOrderbyId };
