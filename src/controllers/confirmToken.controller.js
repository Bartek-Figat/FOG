/* eslint-disable no-return-assign */
/* eslint-disable consistent-return */
require('dotenv').config();
const { verify } = require('jsonwebtoken');

const { UserService } = require('../services/userService');

const { secret } = process.env;

const tokenIsValidated = async (req, res) => {
  try {
    const { token } = req.params;

    const userToken = await UserService.tokenVerification({ token });

    if (!userToken) return res.status(401);

    const decode = verify(userToken.token, `${secret}`);

    if (!decode) return res.status(401);
    console.log(decode);
    req.user = decode;
    return res.status(200).end();
  } catch (err) {
    console.log(err);
  }
};

module.exports = { tokenIsValidated };
