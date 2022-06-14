const Order = require("../models/orderModels");
const VirtualCard = require("../models/VirtualCard");

const rechargeVirtualCard = async (req, res) => {
  const exists = await VirtualCard.findOne({ owner: req.user.userId });
  let virtualcardInfo;

  console.log(exists);

  if (!exists) {
    virtualcardInfo = {
      amount: parseInt(req.body.amount.value),
      owner: req.user.userId,
    };
    virtualcard = new VirtualCard(virtualcardInfo);
  } else {
    exists.amount = parseInt(exists.amount) + parseInt(req.body.amount.value);
    exists.owner = exists.owner;
  }
  virtualcard = exists.save();
  res.send("done");
};

const paymentWithCard = async (req, res) => {
  const data = await VirtualCard.find({ owner: req.user.userId });
  if (data[0].amount < req.body.price) {
  } else {
    let virtualCard = await VirtualCard.findByIdAndUpdate(data[0]._id, {
      amount: data[0].amount - req.body.price,
    });

    if (virtualCard) {
      const order = await Order.findById(req.params.id);
      (order.isPaid = true),
        (order.paidAt = Date.now()),
        (order.paymentResult = {
          id: req.body.id,
          update_time: req.body.update_time,
          email_address: req.body.email_address,
        });
      const updateOrder = await order.save();
      res.status(200).send({ msg: "Order Paid", updateOrder });
    }
  }
};

module.exports = { rechargeVirtualCard, paymentWithCard };
