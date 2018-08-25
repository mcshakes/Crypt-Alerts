const express = require("express");
const router = express.Router()
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

const { User } = require("../models/user")

router.post("/api/users/login", function (req, res, next) {
  passport.authenticate("local", {session: false}, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message : "Something Wrong!",
        user    :  user
      });
    }

    req.login(user, {session: false}, (err) => {
      if (err) {
        res.send(err);
      }

      const token = jwt.sign(user, "my_super_secret");
      return res.json({user, token});
    });
  })
  (req, res);
});

module.exports = router;
