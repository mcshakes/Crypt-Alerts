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
  let price = req.body.price

    Currency.find({
        ticker: ticker
      })
      .exec()
      .then(coin => {
        if (coin.length < 1) {
          Currency
            .create({
              _id: new mongoose.Types.ObjectId(),
              ticker: ticker,
              price: price
            })
            .then((coin) => {

              let watcher = Watchlist
                              .create({
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
        }

        if (coin.length > 0) {
          // console.log("COINS EXISTS IN DB!")
          // Watchlist.find({userId: userId})
          //   .then(allWl => {
          //     allWl.map(watchlist => {
          //       if (!watchlist.list[0] === coin._id) {
          //         console.log("DOESNT HAVE IT", coin)
          //         // Watchlist
          //         //   .create({
          //         //     _id: new mongoose.Types.ObjectId(),
          //         //     userId: userId,
          //         //     list: [ coin[0] ]
          //         //   })
          //         //   .then((watchItem) => {
          //         //     return response.json(watchItem)
          //         //   })
          //       } else {
          //         // response.send({message: "You are already watching this coin"})
          //         throw new Error("You are already watching this")
          //       }
          //     })
          //   })

          Watchlist
            .create({
              _id: new mongoose.Types.ObjectId(),
              userId: userId,
              list: [ coin[0] ]
            })
            .then((watchItem) => {
              return response.json(watchItem)
            })
        }
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
