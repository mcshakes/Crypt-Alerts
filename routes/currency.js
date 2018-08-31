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

  Currency.find({
      ticker: ticker
    })
    .count()
    .then(count => {
      if (count <= 0) {
        const watchlist = new Watchlist({
          _id: new mongoose.Types.ObjectId(),
          userId: userId
        })
        watchlist.save()

        Currency
          .create({
            _id: new mongoose.Types.ObjectId(),
            ticker: ticker
          })
          .then((coin) => {
            Watchlist.findByIdAndUpdate(watchlist._id,
              { "$push": { "list": coin } },
              { "new": true, "upsert": true },
              function(err, user) {
                if (err) throw err;
                return res.status(201)
              }
            );
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
