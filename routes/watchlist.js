const express = require("express");
const router = express.Router()
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const { User } = require("../models/user")
const { Watchlist } = require("../models/watchlist")
const { Currency } = require("../models/currency")

// create and save the watchlist a user has
router.post("/api/users/:id/add-coin", (req, res) => {
  let userId = req.params.id;

  Currency
  .create({
    
  })
  User.find({userId})
})
