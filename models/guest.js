const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const guestSchema = new Schema({
  userid: {
    type: String,
    required: true,
  },

  cart: [
    {
      productid: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      productprice: {
        type: Number,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Guest", guestSchema);
