const express = require("express");
const router = express.Router()
const bodyParser = require("body-parser");
const checkAuth = require("../middleware/check-auth");

const mongoose = require("mongoose");
const { User } = require("../models/user")
const { Watchlist } = require("../models/watchlist")
const { Currency } = require("../models/currency")


//------------ SEARCH FUNCTIONALITY ------------------------

router.get("/api/search", (req, res) => {
  axios.get(`https://api.nomics.com/v1/prices?key=${key}`)
  .then((collection) => {
    res.json(collection.data)
  })
  .catch((error) => {
    res.status(400).send(error);
  })
})

//------------ PRICES ONLY ------------------------

router.get("/api/price", (req, res) => {
  axios.get(`https://api.nomics.com/v1/prices?key=${key}`
    )
    .then((response) => {
      res.json(response.data)
    })
    .catch((error) => {
      res.status(400).send(error);
    })
})





module.exports = router;
