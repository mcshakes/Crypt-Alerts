const mongoose = require("mongoose")
mongoose.Promise = global.Promise;

const WatchListSchema = mongoose.Schema({
  list: [
    { type: mongoose.Schema.Types.ObjectId,
      ref: "Currency"
    }
  ]
  valueAmount: String,
  direction: String
})

const watchList = mongoose.model("Watchlist", WatchListSchema)
module.exports = { watchList };
