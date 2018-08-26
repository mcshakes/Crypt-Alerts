const express = require("express");
const router = express.Router()
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { User } = require("../models/user")

router.post("/api/users/login", (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Authorization Failed Here..." // no email
        })
      }

      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Authorization Failed..." //wrong password
          })
        }
        if (result) {
          const token = jwt.sign({
                                    email: user[0].email,
                                    userId: user[0]._id     // The payload
                                  }, process.env.JWT_KEY,
                                  {
                                    expiresIn: "1h"         // The options
                                  });

          return res.status(200).json({
            message: "Auth succesful",
            token: token
          })
        }
        return res.status(401).json({
          message: "Authorization Failed..." //wrong password
        })
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    })

})

router.post("/api/users/signup", (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) { // If User exists already
        return res.status(422).json({
          message: "Email already exists"
        })
      } else {

        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error:err
            })
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash
            });
            user.save()
            .then(result => {
              console.log(result)
              res.status(201).json({
                message: "User Created"
              })
            })
            .catch(err => {
              console.log(err)
              res.status(500).json({
                error: err
              })
            })
          }
        })
      } // End of success block
    })
})

module.exports = router;