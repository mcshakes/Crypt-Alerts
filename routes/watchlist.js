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
    res.json(allCoins)
  })
})

router.post("/api/set-alert", checkAuth, (req, res) => {
  let userId = req.userData.userId;
  let ticker = req.body.ticker
  let high = req.body.high
  let low = req.body.low

  Currency.find({ticker: ticker})
    .then(coin => {
      return coin[0]._id
    })
    .then(coinID => {

      Watchlist.find({userId: userId, list:[coinID]})
        .then(userWatchlist => {
          console.log("THIS?", userWatchlist[0])
        })
    })
  // search for userwatchlist by userId
    // use previous ID and that's the watchlist
    // add the high and low set

  // { high: '22', low: '22', ticker: 'XRP' }

})

module.exports = router;
