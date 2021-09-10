/* eslint-disable no-unused-vars */
/* eslint-disable object-shorthand */
/* eslint-disable no-return-assign */
/* eslint-disable consistent-return */
require('dotenv').config();
const { verify } = require('jsonwebtoken');
const { sign } = require('jsonwebtoken');
const axios = require('axios').default;
const { UserService } = require('../services/userService');

const { clientID, clientSecret, secret } = process.env;

class Controller {
  static async tokenIsValidated(req, res) {
    try {
      const { token } = req.params;

      const userToken = await UserService.tokenVerification(token);

      if (userToken === undefined) return res.status(401).end();
      verify(userToken.token, `${secret}`, (err, decoded) => {
        if (err) {
          res.status(401).end();
        } else {
          req.session.user = decoded.data;
          req.session.save(() => {
            return res.json({ success: 200 });
          });
        }
      });
    } catch (err) {
      console.log(err);
      res.status(500);
    }
  }

  static async githubCallback(req, res, next) {
    try {
      const { code } = req.query;
      const response = await axios.post(
        `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${code}`
      );

      const urlSearchParams = new URLSearchParams(response.data);
      const params = Object.fromEntries(urlSearchParams.entries());

      const user = await axios.get('https://api.github.com/user', {
        headers: {
          Authorization: `token ${params.access_token}`,
        },
      });
      if (!user.data.id) {
        res.status(401);
      } else {
        const authToken = sign(
          {
            data: user.data.id,
          },
          `${secret}`
        );

        await UserService.findOrCreate(user, authToken);
        res.status(200).redirect(`http://localhost:3000/success/activated/${authToken}`);
      }
    } catch (err) {
      console.log(err);
      res.status(401);
    }
  }

  static async redirectToGitHubPanelLLogin(req, res, next) {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${clientID}&scope=user:email`);
  }

  static async shwoUserDetails(req, res, next) {
    const options = { projection: { _id: 0, id: 0, token: 0 } };
    const userData = await UserService.showUser(req.session.user, options);
    console.log('line 78', userData);
    res.json({ user: userData });
  }

  static async logout(req, res, next) {
    const user = await UserService.deletSessionToken(req.session.user);
    console.log('user -> 84', user);
    req.session.destroy();
    res.status(200);
  }
}

module.exports = {
  Controller,
};
