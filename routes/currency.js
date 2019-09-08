const express = require("express");
const router = express.Router()
const bodyParser = require("body-parser");
const verifyAuthToken = require("../middleware/verifyAuthToken");

const mongoose = require("mongoose");
const { User } = require("../models/user")
const { Watchlist } = require("../models/watchlist")
const { Currency } = require("../models/currency")

router.post("/api/add-coin", verifyAuthToken, async (req, res) => {
  let userID = req.user._id
  let ticker = req.body.ticker
  let price = req.body.price

  const searchCoin = await Currency.find({ ticker: ticker })
  // SEE IF COIN EXISTS

  // IF NOT (ARRAY IS EMPTY):
  if (searchCoin.length < 1) {
    console.log("New Coin is being created in the DB")

    const newCoin = new Currency({
      ticker: ticker,
      price: price
    })

    try {
      const savedCoin = await newCoin.save();

      // Save coin on Watchlist.target array

      const newWatcher = await Watchlist.create({
        userId: userID,
        targets: [
          savedCoin
        ]
      })
    } catch (err) {
      res.status(400).send(err);
    }
  }



  // .then(coin => {
  //   if (coin.length < 1) {
  //     Currency
  //       .create({
  //         _id: new mongoose.Types.ObjectId(),
  //         ticker: ticker,
  //         price: price
  //       })
  //       .then((coin) => {

  //         let watcher = Watchlist
  //           .create({
  //             _id: new mongoose.Types.ObjectId(),
  //             userId: userID,
  //             list: [
  //               coin
  //             ]
  //           })
  //       })
  //       .catch(err => {
  //         console.log(err)
  //         res.status(500).json({
  //           error: err
  //         })
  //       })
  //   }

  //   if (coin.length > 0) {

  //     Watchlist
  //       .create({
  //         _id: new mongoose.Types.ObjectId(),
  //         userId: userID,
  //         targets: [coin[0]]
  //       })
  //       .then((watchItem) => {
  //         return response.json(watchItem)
  //       })
  //   }
  // })

  // .then(result => {
  //   res.status(201).json({
  //     message: "Watch created on coin"
  //   })
  // })
  // .catch(err => {
  //   console.log(err)
  //   res.status(500).json({
  //     error: err
  //   })
  // })
})

module.exports = router;
