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


  // Watchlist
  // .findById({})
  // .then(user => {
  //   // console.log(user)
  //   return res.status(200).json(user)
  // })
  // .catch(err => {
  //   console.log(err);
  //   res.status(500).json({ message: "Internal server error" });
  // })
})

module.exports = router;
