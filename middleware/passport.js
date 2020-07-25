const jwtstrategy = require("passport-jwt").Strategy;
const extractjwt = require("passport-jwt").ExtractJwt;

const User = require("../models/user");
// const SECRET = require('../config/keys').SECRET;
const opts = {};
opts.jwtFromRequest = extractjwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "tasmanianDevil";

module.exports = (passport) => {
  passport.use(
    new jwtstrategy(opts, (jwt_payload, done) => {
      User.findOne({ _id: jwt_payload.id })
        .then((user) => {
          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        })
        .catch((err) => {
          console.log({ error: "Error while authenticating the user!!" });
        });
    })
  );
};
