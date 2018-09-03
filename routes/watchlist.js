const express = require("express");
const router = express.Router()
const bodyParser = require("body-parser");
const checkAuth = require("../middleware/check-auth");

const mongoose = require("mongoose");
const { User } = require("../models/user")
const { Watchlist } = require("../models/watchlist")
const { Currency } = require("../models/currency")


router.get("/api/coin-watchlist", checkAuth, (req, res) => {
  let userId = req.userData.userId;

  Watchlist.find({userId: userId}, function(err, result) {
    if (err) throw err;

  })
  .then(results => {
    return results.map(item => {
      let coinID = item.list[0]

    return Currency.findById(coinID, (err, coin) => {
        if (err) throw err;
      })
      .then(coins => {
        return coins
      })
    })
  })
  .then(promises => {
    return Promise.all(promises)
  })
  .then(allCoins => {
    // { _id: 5b8c5fca8d1e3230eaf68ea6, ticker: 'XRP', __v: 0 }
    return allCoins
  })
})

module.exports = router;
