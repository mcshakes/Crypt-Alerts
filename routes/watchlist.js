const express = require("express");
const router = express.Router()
const bodyParser = require("body-parser");
const checkAuth = require("../middleware/check-auth");

const mongoose = require("mongoose");
const { User } = require("../models/user")
const { Watchlist } = require("../models/watchlist")
const { Currency } = require("../models/currency")

// create and save the watchlist a user has
router.post("/api/add-coin", checkAuth, (req, res) => {
  let userId = req.userData.userId;
  let ticker = req.body.ticker

  Currency
    .create({
              _id: new mongoose.Types.ObjectId(),
              ticker: ticker
            })
    .then((coin) => {
      User.findByIdAndUpdate(userId,
        { "$push": { "watchlist": coin } },
        { "new": true, "upsert": true },
        function (err, user) {
          if (err) throw err;

          return res.status(201).json(user)
        }
      );
    })
})

router.get("/api/coin-watchlist", checkAuth, (req, res) => {
  let userId = req.userData.userId;

  User
  .findById(userId)
  .then(user => {
    return res.status(200).json(user)
  })
  .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
  })
})

module.exports = router;
