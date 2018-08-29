const mongoose = require("mongoose")
mongoose.Promise = global.Promise;

const WatchlistSchema = mongoose.Schema({
  list: [
    { type: mongoose.Schema.Types.ObjectId,
      ref: "Currency"
    }
  ]
  valueAmount: String,
  direction: String
})

const watchlist = mongoose.model("Watchlist", WatchlistSchema)
module.exports = { watchList };
