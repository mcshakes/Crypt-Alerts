const express = require("express");
const router = express.Router()
const bodyParser = require("body-parser");
const checkAuth = require("../middleware/check-auth");

const mongoose = require("mongoose");
const { User } = require("../models/user")
const { Watchlist } = require("../models/watchlist")
const { Currency } = require("../models/currency")

router.post("/api/add-coin", checkAuth, (req, res) => {
  let userId = req.userData.userId;
  let ticker = req.body.ticker
  console.log("CLICK HERE?", ticker)

  Currency.find({
      ticker: ticker
    })
    .count()
    .then(count => {
      if (count <= 0) {
        const coin = new Currency({
          _id: new mongoose.Types.ObjectId(),
          ticker: ticker
        })
        coin.save()
        .then(coin => {
          console.log("COIN created => ", coin)
        })
      }
      // return the coin
    })

})

module.exports = router;
