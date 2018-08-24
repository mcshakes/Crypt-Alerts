const mongoose = require("mongoose")
mongoose.Promise = global.Promise;

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  firstName: { type: String, required: true },
  createdDate: {type: Date, default: Date.now}
})

const User = mongoose.model("User", userSchema)
module.exports = { User };
