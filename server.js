const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const axios = require('axios');
require("dotenv").config();
const bcrypt = require("bcrypt");

const CronJob = require("cron").CronJob;
const { lookAndSee } = require("./cron-jobs/checkPrice")
const { Watchlist } = require("./models/watchlist")
const { Currency } = require("./models/currency")

const { ISODateString, encode } = require("./helpers/dates")
const { User } = require("./models/user");
const app = express();
const server = require("http").Server(app);

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const key = process.env.NOMICS_KEY

const userRouter = require("./routes/user")
const watchlistRouter = require("./routes/watchlist")
const currencyRouter = require("./routes/currency")

const APIRouter = require("./routes/nomicsAPI")

app.use(express.static(path.join(__dirname, 'client/build')));

app.use(userRouter);
app.use(watchlistRouter);
app.use(currencyRouter);
app.use(APIRouter);

let interval;

const io = require("socket.io")(server);

io.on('connection', function (socket) {
  console.log('A new WebSocket connection established with' + socket);
});

//------------ Cron Job ------------------------

function getNewPrices() {
  return axios.get(`https://api.nomics.com/v1/prices?key=${key}`)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      res.status(400).send(error);
    })
}


const job = new CronJob('*/8 * * * *', function() {
  let collection = new Array();

  Currency.find()
    .exec()
    .then((allCoins) => {
      allCoins.map((coin) => {
        collection.push(coin.ticker)
      })
      return collection
    })
    .then(tickers => {

      getNewPrices()
        .then(APIresults => {
          return APIresults.filter((result) => {
            return tickers.some(dbTick => {
              if (dbTick === result.currency) {
                return result
              }
            })
          })
        })
        .then(updates => {
          updates.map((newPrice) => {
            let query = Currency.findOneAndUpdate(
              {ticker: newPrice.currency},
              {price: newPrice.price}
            )
            query.exec();
          })
        })

    })

});

job.start()

//--------------------------------------------

const port = process.env.PORT || 3001

server.listen(port, () => {
  console.log("listening on Port 3001")
});

//------------ DATABASE ------------------------

mongoose.connect(`mongodb://${process.env.MONGO_USER}:${process.env
            .MONGO_PASS}@ds127342.mlab.com:27342/crypt-alerts`);

mongoose.Promise = global.Promise;

const db = mongoose.connection;

//------------ DATABASE ------------------------

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
