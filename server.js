const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const axios = require('axios');
require("dotenv").config();
const bcrypt = require("bcrypt");
const PubNub = require("pubnub")

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

//--------------------------------------------

const port = process.env.PORT || 3001

server.listen(port, () => {
  console.log("Node Version: ", process.version)
  console.log(`Express Server listening on %d, on %s mode`, port, app.get("env"))
});


//------------ Currency Snapshot Component ------------------------

const movement = io.of("/snapshot-io")

movement.on("connection", function (socket) {
  // console.log(socket.handshake)
  let strData;
  const ticker = socket.handshake.query.namespace

  console.log("Updating chartz"), setInterval(
    () => emitChartData(socket, ticker),
    10000
  );
  socket.on("disconnect", () => console.log("Chartz disconnected"))


})

const emitChartData = async (socket, ticker) => {
  try {
    return axios.get(`https://min-api.cryptocompare.com/data/top/exchanges/full?fsym=${ticker}&tsym=USD`)
      .then((response) => {
        socket.emit("FromAPI", response.data)
      })

  } catch (error) {
    console.log(`Error: ${error.code}`);
  }
}

//------------ Market Leaders Component ------------------------
const leaderSocket = io.of("/capleader")

leaderSocket.on('connection', function (socket) {
  console.log("Updating market cap leaders"), setInterval(
    () => emitCapLeaders(socket),
    10000
  );
  socket.on("disconnect", () => console.log("Client disconnected"))
});

const capLeaders = ["BTC", "ETH", "XRP", "BCH", "LTC", "ADA", "NEO", "XLM", "EOS", "DASH"]

const emitCapLeaders = async socket => {
  try {
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

        socket.emit("FromAPI", collection)
      })

  } catch (error) {
    console.log(`Error: ${error.code}`);
  }
}

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


const job = new CronJob('*/8 * * * *', function () {
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
              { ticker: newPrice.currency },
              { price: newPrice.price }
            )
            query.exec();
          })
        })

    })

});

job.start()


//------------ DATABASE ------------------------

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0-b5rcs.mongodb.net/test?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useCreateIndex: true
});

mongoose.Promise = global.Promise;

const db = mongoose.connection;

//------------ DATABASE ------------------------

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
