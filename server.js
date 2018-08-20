const express = require("express");
const morgan = require("morgan");
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

const key = provess.env.NOMICS_KEY
// app.get("https://api.nomics.com/v1/prices?key=${key}", (resp) => {
//   res.send(data)
// })


// NOTE: Specific price

app.get("/api/price", (req, res) => {
  axios.get(`https://api.nomics.com/v1/prices?key=${key}`)
    .then((response) => {
      // res.data is array of objects
      response.data.find((coin) => {
        if (coin.currency === "BTC")  {
          console.log(coin)
        }
      })
    })
    .catch((error) => {
      res.status(400).send(err);
    })
})

// NOTE: Price by markets

app.get("/api/bitcoin-price", (req, res) => {
  axios.get(`https://api.nomics.com/v1/markets/prices?key=${key}&currency=BTC`)
  .then((data) => {
    console.log(data)
  })
  .catch((error) => {
    res.status(400).send(error);
  })
})

app.get("/api/market-interval-btc", (req, res) => {

})
