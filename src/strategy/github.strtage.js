/* eslint-disable func-names */
require('dotenv').config();
const GitHubStrategy = require('passport-github2').Strategy;
const passport = require('passport');
const { UserService } = require('../services/userService');

const github = (server) => {
  server.use(passport.initialize());
  server.use(passport.session());

  passport.serializeUser(function (user, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
  });

  const { clientID, clientSecret, callbackURL } = process.env;

  passport.use(
    new GitHubStrategy(
      {
        clientID,
        clientSecret,
        callbackURL,
      },
      async (accessToken, refreshToken, profile, done) => {
        const userProfiel = await UserService.findOrCreate(profile, accessToken);
        return done(null, userProfiel);
      }
    )
  );
};

module.exports = {
  github,
};
