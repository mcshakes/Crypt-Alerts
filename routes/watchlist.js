const express = require("express");
const router = express.Router()
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const { User } = require("../models/user")
const { Watchlist } = require("../models/watchlist")
const { Currency } = require("../models/currency")

// create and save the watchlist a user has
router.post("/api/add-coin", (req, res) => {
  let userId = req;
  let ticker = req.body.ticker

  console.log("ID", userId)


  Currency
    .create({
              _id: new mongoose.Types.ObjectId(),
              ticker: ticker
            })
    .then((coin) => {
      // need to push into Watchlist
    })

  // let watchlist = new Watchlist({
  //   _id: new mongoose.Types.ObjectId()
  //   list: [
  //
  //   ]
  // })
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
