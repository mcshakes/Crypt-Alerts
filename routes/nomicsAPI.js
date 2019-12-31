const express = require("express");
const router = express.Router()
const bodyParser = require("body-parser");
const checkAuth = require("../middleware/verifyAuthToken");
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

//------------ AGGREGATED OHLC CANDLES ------------------------

router.get("/api/candles", (req, res) => {
  let coin = req.query.coin;
  let date = ISODateString(new Date());
  let startDate = encode(date);

  axios.get(`https://api.nomics.com/v1/candles?key=${key}&interval=1d&currency=${coin}&start=${startDate}`)
    .then((response) => {
      res.json(response.data[0])
    })
    .catch((error) => {
      res.status(400).send(error);
    })
})


// NOTE: Price by market interval => NOT IMPLEMENTED

router.get("/api/market-interval-btc", (req, res) => {
  axios.get(`https://api.nomics.com/v1/exchange-markets/interval?key=${key}&currency=BTC&start=2018-04-14T00%3A00%3A00Z&end=2018-07-14T00%3A00%3A00Z`
    )
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      res.status(400).send(error);
    })
})



module.exports = router;
