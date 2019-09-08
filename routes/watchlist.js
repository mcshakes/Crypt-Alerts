const express = require("express");
const router = express.Router()
const bodyParser = require("body-parser");
const verifyAuthToken = require("../middleware/verifyAuthToken");

const mongoose = require("mongoose");
const { User } = require("../models/user")
const { Watchlist } = require("../models/watchlist")
const { Currency } = require("../models/currency")

router.get("/watchlist", verifyAuthToken, async (req, res) => {
  let userID = req.user._id

  try {
    const userWatchlist = await Watchlist.find({ userId: userID })

    userWatchlist.map(data => {
      let coinID = data.targets[0]
      console.log("What's this?", data.targets[0])

      // const coinInQuestion = 
    })
  } catch (err) {
    res.status(400).send(err)
  }


  // Watchlist.find({ userId: userID })
  //   .then(results => {
  //     return results.map(item => {
  //       let coinID = item.list[0]
  //       let high = item.highLimit
  //       let low = item.lowLimit

  //       return Currency.findById(coinID, (err, coin) => {
  //         if (err) throw err;
  //       })
  //         .then(coin => {
  //           const new_coin = Object.assign({}, coin, { high, low });
  //           return new_coin
  //         })
  //     })
  //   })
  //   .then(promises => {
  //     return Promise.all(promises)
  //   })
  //   .then(allCoins => {
  //     // { _id: 5b8c5fca8d1e3230eaf68ea6, ticker: 'XRP', __v: 0 }
  //     res.json(allCoins)
  //   })
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
