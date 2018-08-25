const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.use(new LocalStrategy({
    usernameField: "email",
    passwordField: "password"
  },
  function (email, password, cb) {
    return User.findOne({email, password})
      .then(user => {
        if (!user) {
          return cb(null, false, {
            message: "Incorrect email or password."
          });
        }

        return cb(null, user, {
          message: "Logged in Succesfully with Passport"
        })
        .catch(err => cb(err));
      })
  }
))
