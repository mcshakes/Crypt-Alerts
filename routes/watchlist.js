const express = require("express");
const router = express.Router()
const bodyParser = require("body-parser");
const verifyAuthToken = require("../middleware/verifyAuthToken");

const mongoose = require("mongoose");
const { User } = require("../models/user")
const { Watchlist } = require("../models/watchlist")
const { Currency } = require("../models/currency")

router.get("/watchlist", verifyAuthToken, async (req, res) => {
  let userID = req.query.user

  try {
    const userWatchlist = await Watchlist.find({ userId: userID })

    const coinIdPromises = userWatchlist.map(async coin => {
      let coinID = coin.targets[0];
      const listCoin = await Currency.findById(coinID);

      return listCoin;
    });

    const results = await Promise.all(coinIdPromises)
    res.json(results)

  } catch (err) {
    res.status(400).send(err)
  }

})

router.post("/api/set-alert", verifyAuthToken, (req, res) => {
  let userId = req.userData.userId;
  let ticker = req.body.ticker
  let high = req.body.high
  let low = req.body.low

  Currency.find({ ticker: ticker })
    .then(coin => {
      return coin[0]._id
    })
    .then(coinID => {
      let query = { userId: userId, list: [coinID] }
      Watchlist.find(query)
        .then(userWatchlist => {
          // console.log("THIS?", userWatchlist[0])
          return userWatchlist[0].update({
            $set: {
              "highLimit": high,
              "lowLimit": low,
              "hasAlert": true,
              "sentAlert": false
            }
          })
        })
        .catch(error => {
          console.log(error)
        })
    })

})

router.post("/api/watchlist-status", verifyAuthToken, (req, res) => {
  let userId = req.userData.userId;
  let coinId = req.body.coinID

  let query = { userId: userId, list: [coinId] }
  Watchlist.find(query)
    .then(data => {
      res.json(data)
    })
    .catch(error => {
      console.log(error)
    })
})

router.post("/api/change-alert-status", verifyAuthToken, (req, res) => {
  let userId = req.userData.userId;
  let coinId = req.body.coinID

  let query = { userId: userId, list: [coinId] }
  Watchlist.find(query)
    .then(data => {
      return data[0].update({
        $set: {
          "sentAlert": false
        }
      })
    })
    .catch(error => {
      console.log(error)
    })
})

module.exports = router;
