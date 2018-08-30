const mongoose = require("mongoose")
mongoose.Promise = global.Promise;

const watchlistSchema = mongoose.Schema({
  list: [
    { type: mongoose.Schema.Types.ObjectId,
      ref: "Currency"
    }
  ],
  valueAmount: String,
  direction: String
})

const Watchlist = mongoose.model("Watchlist", watchlistSchema)
module.exports = { Watchlist };
