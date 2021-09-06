/* eslint-disable object-shorthand */
/* eslint-disable no-return-assign */
/* eslint-disable consistent-return */
require('dotenv').config();
const { verify } = require('jsonwebtoken');

const { UserService } = require('../services/userService');

const { secret } = process.env;

const tokenIsValidated = async (req, res) => {
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
};

module.exports = { tokenIsValidated };
