const express = require("express");
const router = express.Router()
const bodyParser = require("body-parser");
const checkAuth = require("../middleware/check-auth");
const axios = require('axios');
const key = process.env.NOMICS_KEY

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


//------------ MARKET CAP LEADERS ------------------------


const capLeaders = ["BTC", "ETH", "XRP", "BCH", "LTC", "ADA", "NEO", "XLM", "EOS", "DASH"]

function getMarketLeaders() {
  return axios.get(`https://api.nomics.com/v1/prices?key=${key}`)
    .then((response) => {
      let collection = []

      capLeaders.map((ticker) => {
        response.data.filter((coin) => {
          if (coin.currency === ticker) {
            collection.push(coin)
          }
        })
      })
      return collection
    })
}

router.get("/api/market-leaders", (req, res) => {
    getMarketLeaders()
    .then((collection) => {
      res.json(collection)
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
