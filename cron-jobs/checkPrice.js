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
const { createMessage } = require("../helpers/twilioAlert")
const { User } = require("../models/user");
const key = process.env.NOMICS_KEY

const lookAndSee = new CronJob("* * * * *", function() {
  console.log("\nTaking a look-see on your watchlists...")
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
                    let priceIdx = parseFloat(coin[0].price, 10)
                    let diff = Math.abs(high - priceIdx)

                    // console.log("HIGH", high)
                    // console.log("real-PRICE", priceIdx)
                    // console.log("DIFF: ", diff)

                    if (diff < 3.50) {
                      console.log("\nSENDING A MESSAGE...")

                      Currency.find({ _id: watcher.list[0] })
                        .then(currency => {
                          return currency[0]
                        })
                        .then(data => {
                          let contents = []
                          contents.push(data, watcher.highLimit)
                          
                          createMessage(contents)
                        })

                    } else {
                      console.log("\nDifference is greater than $3.50. Let's wait and see...")
                    }

                })
              }) //end of then block
          })
      })
    })

})
lookAndSee.start()



module.exports = { lookAndSee }
