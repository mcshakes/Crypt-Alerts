"use strict"

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const currencySchema = mongoose.Schema({
  name: String,
  ticker: {
    type: String,
    required: true
  }
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

const Currency = mongoose.model("Currency", currencySchema)
module.exports = { Currency };
