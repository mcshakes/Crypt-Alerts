"use strict"

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const currencySchema = mongoose.Schema({
  price: String,
  name: String,
  ticker: {
    type: String,
    required: true
  }
});


const Currency = mongoose.model("Currency", currencySchema)
module.exports = { Currency };
