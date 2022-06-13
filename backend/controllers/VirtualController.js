const VirtualCard = require("../models/VirtualCard");

const rechargeVirtualCard = async (req, res) => {
  const exists = await VirtualCard.findOne({ owner: req.user.userId });
  let virtualcardInfo;

  console.log(exists);

  let virtualcard;
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

module.exports = rechargeVirtualCard;
