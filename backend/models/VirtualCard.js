const mongoose = require("mongoose");

const virtualCardSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
    default: 0,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const VirtualCard = mongoose.model("virtualcard", virtualCardSchema);

module.exports = VirtualCard;
