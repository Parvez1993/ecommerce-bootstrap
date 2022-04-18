const Order = require("../models/orderModels");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors");
const stripe = require("stripe")("sk_test_...");

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

const getOrderAfterPayment = async (req, res) => {
  console.log(req.params.id);
  const order = await Order.findById(req.params.id);

  if (order) {
    (order.isPaid = true),
      (order.paidAt = Date.now()),
      (order.paymentResult = {
        id: req.body.id,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      });

    const updateOrder = await order.save();
    res.status(StatusCodes.OK).json({ order });
  } else {
    throw new NotFoundError("No such order exists");
  }
};

const StripePayment = async (req, res) => {
  const { token = {}, amount = 0 } = req.body;
  console.log(token);
};

module.exports = {
  getOrder,
  getOrderbyId,
  getOrderAfterPayment,
  StripePayment,
};
