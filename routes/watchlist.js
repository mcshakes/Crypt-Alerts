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

  // { high: '22', low: '0.1' }
  Watchlist.find({userId: userId}, function(err, result) {
    if (err) throw err;
  })
  .then(results => {
    return results.map(item => {
      let coinID = item.list[0]

      Currency.findById(coinID)
        .then(namedResult => {
          console.log(namedResult)

        // NOTE: Stopped because I came full circle.
          // { updatedAt: 2018-09-08T23:01:33.074Z,
          //    _id: 5b93416b50e35f53c4e7de56,
          //    ticker: 'ZRC',
          //    price: '1.52894',
          //    __v: 0 }
        })
    })
    // .find the specific coin I am updating then update it
  })

})

module.exports = router;
