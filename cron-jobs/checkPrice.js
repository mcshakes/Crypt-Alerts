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
const key = process.env.NOMICS_KEY

const lookAndSee = new CronJob("*/3 * * * *", function() {
  // console.log("Taking a look-see on your watchlists...")
  let collection = new Array();

  Watchlist.find({ hasAlert: true })
    .then(watchlists => {
      return watchlists.map(items => {
        return items.list[0]
      })
    })
    .then(coinIDs => {

      coinIDs.forEach(id => {
        Currency.find( { _id: id } )
          .then(coin => {
            // coin.price here within DB
            Watchlist.find({list:[id]})
              .then(lists => {
                // An array of watchlists that are watching a specific coin
                lists.map(watcher => {

                    let high = parseFloat(watcher.highLimit)
                    let priceIdx = parseFloat(coin.price, 10)
                    let diff = Math.abs(high - priceIdx)

                    if (diff < 3.50) {
                      console.log("\nCLOSE. SELL IMMEDIATELY!")
                    } else {
                      console.log("\nDifference is greater than $3.50")
                    }

                })
              }) //end of then block
          })
      })
    })

})
lookAndSee.start()



module.exports = { lookAndSee }
