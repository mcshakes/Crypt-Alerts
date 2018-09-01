const express = require("express");
const router = express.Router()
const bodyParser = require("body-parser");
const checkAuth = require("../middleware/check-auth");

const mongoose = require("mongoose");
const { User } = require("../models/user")
const { Watchlist } = require("../models/watchlist")
const { Currency } = require("../models/currency")

function createWatchlist(id) {
  return
}

router.post("/api/add-coin", checkAuth, (req, res) => {
  let userId = req.userData.userId;
  let ticker = req.body.ticker

  Currency.find({
      ticker: ticker
    })
    .exec()
    .then(coin => {

      if (coin.length < 1) {
        Currency
          .create({
            _id: new mongoose.Types.ObjectId(),
            ticker: ticker
          })
          .then((coin) => {

            let watcher = Watchlist.create({
              _id: new mongoose.Types.ObjectId(),
              userId: userId,
              list: [
                coin
              ]
            })
          })
          .catch(err => {
            console.log(err)
            res.status(500).json({
              error: err
            })
          })
      } // If the coin doesn't exist...

      // If coin does exist
      Watchlist.create({
        _id: new mongoose.Types.ObjectId(),
        userId: userId,
        list: [ coin[0] ]
      })

    })
    .then(result => {
      res.status(201).json({
        message: "Watch created on coin"
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
})

module.exports = router;
