/* eslint-disable no-unused-vars */
require('dotenv').config();
const { sign } = require('jsonwebtoken');
const axios = require('axios').default;
const { UserService } = require('../services/userService');

const { clientID, clientSecret, secret } = process.env;
const githubCallback = async (req, res, next) => {
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
};

module.exports = { githubCallback };
