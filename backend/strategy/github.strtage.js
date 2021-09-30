/* eslint-disable func-names */
require('dotenv').config();
const GitHubStrategy = require('passport-github2').Strategy;
const passport = require('passport');
const { UserService } = require('../services/userService');

const github = () => {
  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (obj, done) {
    done(null, obj);
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
