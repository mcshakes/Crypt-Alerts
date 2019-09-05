const express = require("express");
const router = express.Router()
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { User } = require("../models/user")
const { Watchlist } = require("../models/watchlist")
const { registrationValidation, loginValidation } = require("../utils/validation");

router.post("/login", async (req, res) => {

  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // CHECK EMAIL EXISTS
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email doesn't exist");

  // PASSWORD IS CORRECT
  const validPass = await bcrypt.compare(req.body.password, user.password)
  if (!validPass) return res.status(400).send("Invalid Password")

  // CREATE and SIGN TOKEN
  const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY)
  res.header("auth-token", token).send(token);
})


router.post("/register", async (req, res) => {
  // Validate data before creation
  const { error } = registrationValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Check if user is already in DB

  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(422).send("Email already exists");

  // Hash password and build User object
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt)

  const user = new User({
    email: req.body.email,
    password: hashedPassword
  });

  try {
    const savedUser = await user.save()
    res.send({ user: user._id })
  } catch (err) {
    res.status(400).send(err);
  }
})

module.exports = router;
