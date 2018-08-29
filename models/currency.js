"use strict"

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const currencySchema = mongoose.Schema({
  name: String
  ticker: {
    type: String,
    retuired: true
  }
  // watcher: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User"
  // }]
});

// version 2 above

currencySchema.methods.serialize = function() {
  return {
    id: this._id,
    name: this.name,
    ticker: this.ticker,
    price: this.price
  }
}

const currency = mongoose.model("Currency", currencySchema)

module.exports = { currency };
