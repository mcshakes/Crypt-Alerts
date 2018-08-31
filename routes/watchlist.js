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
  // ID { email: 'test88@test.com',
  // [0]   userId: '5b884d120373243877c5b1a3',


  // Find the User by ID
  // FInd the watchlist of the User
  // Populate the currency within the Watchlist

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
          console.log("DA USER", user)
          return res.status(201).json(user)
        }
      );
    })


})

module.exports = router;
