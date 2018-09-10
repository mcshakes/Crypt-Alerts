const mongoose = require("mongoose")
mongoose.Promise = global.Promise;

const watchlistSchema = mongoose.Schema({
  list: [
    { type: mongoose.Schema.Types.ObjectId,
      ref: "Currency"
    }
  ],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  highLimit: String,
  lowLimit: String,
  hasAlert: Boolean
})

const Watchlist = mongoose.model("Watchlist", watchlistSchema)
module.exports = { Watchlist, watchlistSchema };
