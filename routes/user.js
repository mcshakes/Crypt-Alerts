const express = require("express");
const router = express.Router()
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { User } = require("../models/user")

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
