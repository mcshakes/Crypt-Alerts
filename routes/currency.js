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

  Watchlist.find({userId: userId})
    .then(userLists => {
      userLists.forEach(item => {
        let xid = item.list[0]

        Currency.find({_id: xid})
          .then(coin => {
            if (coin.length < 1) {


            } else {
              console.log("LENGTH", coin.length)
              console.log("ALREADY GOT THIS COIN")
            }
          })
      })
    })
  // Currency.find({
  //     ticker: ticker
  //   })
  //   .exec()
  //   .then(coin => {
  //     if (coin.length < 1) {
  //       Currency
  //         .create({
  //           _id: new mongoose.Types.ObjectId(),
  //           ticker: ticker,
  //           price: price
  //         })
  //         .then((coin) => {
  //
  //           let watcher = Watchlist
  //                           .create({
  //                             _id: new mongoose.Types.ObjectId(),
  //                             userId: userId,
  //                             list: [
  //                               coin
  //                             ]
  //                           })
  //         })
  //         .catch(err => {
  //           console.log(err)
  //           res.status(500).json({
  //             error: err
  //           })
  //         })
  //     } else {
  //
  //         Watchlist
  //           .create({
  //             _id: new mongoose.Types.ObjectId(),
  //             userId: userId,
  //             list: [ coin[0] ]
  //           })
  //           .then((watchItem) => {
  //             return response.json(watchItem)
  //           })
  //
  //
  //     } //end of else block
  //   })
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
