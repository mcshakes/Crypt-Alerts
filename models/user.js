const mongoose = require("mongoose")
mongoose.Promise = global.Promise;


const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String
  },
  createdDate: {type: Date, default: Date.now}
})

const User = mongoose.model("User", userSchema)
module.exports = { User };
