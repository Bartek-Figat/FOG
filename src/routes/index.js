/* eslint-disable prefer-template */
/* eslint-disable camelcase */
/* eslint-disable no-return-await */
/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');

const axios = require('axios').default;

const { Router } = express;

const { UserService } = require('../services/userService');
const { protectedRoutes } = require('../middleware/authentication');

const userRouter = Router();
const { clientID, clientSecret } = process.env;

userRouter.get('/login/github', (req, res) => {
  res.redirect(`https://github.com/login/oauth/authorize?client_id=${clientID}&scope=user:email`);
});

userRouter.get('/auth/github/callback', async (req, res, next) => {
  try {
    const { code } = req.query;
    const response = await axios.post(
      `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${code}`
    );

    // const separate = new RegExp('&');
    // const tokenParams = response.data.split(separate)[0].split('access_token=')[1];

    const urlSearchParams = new URLSearchParams(response.data);
    const params = Object.fromEntries(urlSearchParams.entries());

    const user = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `token ${params.access_token}`,
      },
    });

    req.session = user.data.id;
    res.redirect('http://localhost:3000/auth/github/success');
  } catch (err) {
    console.log(err);
  }
});

userRouter.get('/user', (req, res) => {
  console.log('=======================================');
  console.log('User router!!!!: ', req);
  console.log('=======================================');
  res.json({ user: req.session.id });
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
