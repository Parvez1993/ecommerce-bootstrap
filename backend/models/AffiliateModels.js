const mongoose = require("mongoose");

const AffiliateSchema = new mongoose.Schema(
  {
    amount: { type: Number, required: true },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Affiliate = mongoose.model("Affiliate", AffiliateSchema);

module.exports = Affiliate;
