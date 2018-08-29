const express = require("express");
const router = express.Router()
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const { User } = require("../models/user")
const { Watchlist } = require("../models/watchlist")
const { Currency } = require("../models/currency")

// create and save the watchlist a user has
router.post("/api/add-coin", (req, res) => {
  let userId = req.params.id;
  let ticker = req.body

  console.log("ID", userId)
  console.log("TICKER", ticker)
  
  // create watchlist
  // attached the user
  // pushing the coin onto the list

  // Currency
  // .create({
  //
  // })
  // User.find({userId})
})

module.exports = router;
