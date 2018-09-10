const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const axios = require('axios');
require("dotenv").config();
const bcrypt = require("bcrypt");

const CronJob = require("cron").CronJob;
const { Watchlist } = require("../models/watchlist")
const { Currency } = require("../models/currency")

const { ISODateString, encode } = require("../helpers/dates")
const { User } = require("../models/user");

const lookAndSee = new CronJob("* * * * *", function() {
  console.log("YOUR NEW JOB")
})

lookAndSee.start()


module.exports = { lookAndSee }
