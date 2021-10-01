/* eslint-disable prefer-template */
/* eslint-disable camelcase */
/* eslint-disable no-return-await */
/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
require('dotenv').config();
const express = require('express');

const { Router } = express;
const { UserService } = require('../services/userService');
const { Controller } = require('../controllers/controller');
const { protectedRoutes, checkIfSessionUser } = require('../middleware/authentication');

const userRouter = Router();

userRouter.get('/api/v1/login/github', Controller.redirectToGitHubPanelLLogin);
userRouter.get('/api/v1/auth/github/callback', Controller.githubCallback);
userRouter.get('/api/v1/success/activated/:token', Controller.tokenIsValidated);
userRouter.get('/api/v1/user/detail', checkIfSessionUser, Controller.shwoUserDetails);

userRouter.delete('/logout', Controller.logout);

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
