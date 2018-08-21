const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const axios = require('axios');
require("dotenv").config();


const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

server.listen(3001, () => {
  console.log("listening on Port 3000")
});

const key = process.env.NOMICS_KEY

//------------ DATABASE ------------------------

mongoose.connect(`mongodb://${process.env.MONGO_USER}:${process.env
            .MONGO_PASS}@ds127342.mlab.com:27342/crypt-alerts`);

mongoose.Promise = global.Promise;

// db.on('error', err => {
//     console.error.bind('FAILED to connect to mongoose', err);
// });
//
// db.once('open', () => {
//     console.log('connected to mongoose');
// });

// NOTE: Specific price
const capLeaders = ["BTC", "ETH", "XRP", "BCH", "EOS"]

app.get("/api/price", (req, res) => {
  axios.get(`https://api.nomics.com/v1/prices?key=${key}`)
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
    .then((collection) => {
      res.json(collection)
    })
    .catch((error) => {
      res.status(400).send(error);
    })
})

// NOTE: Price by markets

// app.get("/api/market-price", (req, res) => {
//   axios.get(`https://api.nomics.com/v1/markets/prices?key=${key}&currency=BTC`)
//   .then((data) => {
//
//   })
//   .catch((error) => {
//     res.status(400).send(error);
//   })
// })

// NOTE: Price by market interval
app.get("/api/market-interval-btc", (req, res) => {
  axios.get(`https://api.nomics.com/v1/exchange-markets/interval?key=${key}&currency=BTC&start=2018-04-14T00%3A00%3A00Z&end=2018-07-14T00%3A00%3A00Z`
    )
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      res.status(400).send(error);
    })
})

// NOTE: Aggregated OHLC candles

app.get("/api/candles", (req, res) => {
  axios.get(`https://api.nomics.com/v1/candles?key=${key}&interval=1d&currency=ETH&start=2018-04-14T00%3A00%3A00Z&end=2018-05-14T00%3A00%3A00Z`
    )
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      res.status(400).send(error);
    })
})
