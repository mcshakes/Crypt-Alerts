const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const axios = require('axios');
require("dotenv").config();
const bcrypt = require("bcrypt");

const User = require("./models/user");
const app = express();
const server = require("http").Server(app);

const io = require("socket.io")(server);
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const key = process.env.NOMICS_KEY

let interval;

io.on('connection', function (socket) {
  console.log('A new WebSocket connection established with' + socket.id);
});

server.listen(3001, () => {
  console.log("listening on Port 3001")
});

//------------ DATABASE ------------------------

mongoose.connect(`mongodb://${process.env.MONGO_USER}:${process.env
            .MONGO_PASS}@ds127342.mlab.com:27342/crypt-alerts`);

mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// NOTE: Specific price

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
app.get("/api/market-leaders", (req, res) => {
    getMarketLeaders()
    .then((collection) => {
      res.json(collection)
    })
    .catch((error) => {
      res.status(400).send(error);
    })
})

app.get("/api/search", (req, res) => {
  axios.get(`https://api.nomics.com/v1/dashboard?key=${key}`)
    .then((collection) => {
      res.json(collection.data)
    })
    .catch((error) => {
      res.status(400).send(error);
    })
})


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
  // res
  axios.get(`https://api.nomics.com/v1/candles?key=${key}&interval=1d&currency=ETH&start=2018-04-14T00%3A00%3A00Z&end=2018-05-14T00%3A00%3A00Z`
    )
    .then((response) => {
      res.json(response.data)
    })
    .catch((error) => {
      res.status(400).send(error);
    })
})

app.post("/api/signup", (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({
        error:err
      })
    } else {
      const user = newUser({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        password: hash
      });
      user.save()
      .then(result => {
        console.log(result)
        res.status(201).json({
          message: "User Created"
        })
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({
          error: err
        })
      })
    }
  })
})
