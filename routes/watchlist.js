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

router.get("/api/watchlist-status", checkAuth, (req, res) => {
  let userId = req.userData.userId;

  Watchlist.find({userId: userId})
    .then(response => {
      res.json(response)
    })
    .catch(error => {
      console.log(error)
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
      let query = {userId: userId, list:[coinID]}
      Watchlist.find(query)
        .then(userWatchlist => {
          // console.log("THIS?", userWatchlist[0])
          return userWatchlist[0].update({
            $set: {
              "highLimit": high,
              "lowLimit": low,
              "hasAlert": true
            }
          })
        })
        .catch(error => {
          console.log(error)
        })
    })

})

module.exports = router;
