// const passport = require("passport");
// const passportJWT = require("passport-jwt");
//
// const ExtractJWT = passportJWT.ExtractJwt;
//
// const LocalStrategy = require("passport-local").Strategy;
// const JWTStrategy = passportJWT.Strategy;
//
// passport.use(new JWTStrategy({
//       jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
//       secretOrKey   : "my_super_secret"
//     },
//     function (jwtPayload, cb) {
//       return User.findOneById(jwtPayload.id)
//         .then(user => {
//           return cb(null, user);
//         })
//         .catch(err => {
//           return cb(err)
//         })
//     }
// ))
//
// passport.use(new LocalStrategy({
//     usernameField: "email",
//     passwordField: "password"
//   },
//   function (email, password, cb) {
//     return User.findOne({email, password})
//       .then(user => {
//         if (!user) {
//           return cb(null, false, {
//             message: "Incorrect email or password."
//           });
//         }
//
//         return cb(null, user, {
//           message: "Logged in Succesfully with Passport"
//         })
//         .catch(err => cb(err));
//       })
//   }
// ))
