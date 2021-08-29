/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
require('dotenv').config();
const express = require('express');

const passport = require('passport');

const { Router } = express;
const { UserService } = require('../services/userService');
const { protectedRoutes } = require('../middleware/authentication');

const userRouter = Router();
const { successRedirect, failureRedirect } = process.env;

userRouter.get('/auth/github', passport.authenticate('github', { scope: ['profile', 'email'] }));

userRouter.get(
  '/auth/github/callback',
  passport.authenticate('github', {
    successRedirect,
    failureRedirect,
  })
);

userRouter.get('/user', (req, res) => {
  console.log('User router: ', req.user);
  res.send({ user: req.user });
});

userRouter.get('/logout', (req, res) => {
  req.logout();
});

userRouter.get('/detail', protectedRoutes, async (req, res) => {
  const options = { projection: { _id: 0, password: 0 } };
  const response = await UserService.showUser(req.user, options);
  try {
    res.json({ response });
  } catch (err) {
    res.status(500);
  }
});

userRouter.post('/login', async (req, res) => {
  const credentials = req.body;
  const response = await UserService.createToken(credentials);
  try {
    res.json({ response });
  } catch (err) {
    res.status(500);
  }
});

// eslint-disable-next-line consistent-return
userRouter.post('/register', async (req, res) => {
  const credentials = req.body;
  const response = await UserService.createUser(credentials);
  try {
    if (response === undefined) return res.json({ status: 400 });
    res.json({ status: 200 });
  } catch (err) {
    res.status(500);
  }
});

userRouter.put('/update', protectedRoutes, async (req, res) => {
  const updateDoc = {
    $set: {
      lastName: 'Dickson',
    },
  };
  await UserService.updateUser(req.user, updateDoc);
  try {
    res.json({ status: 200 });
  } catch (err) {
    res.status(500);
  }
});

userRouter.delete('/user_resources', protectedRoutes, async (req, res) => {
  await UserService.deleteUser(req.user);
  try {
    res.json({ status: 200 });
  } catch (err) {
    res.status(500);
  }
});

module.exports = {
  userRouter,
};
