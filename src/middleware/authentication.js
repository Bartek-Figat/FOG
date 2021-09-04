require('dotenv').config();
const { verify } = require('jsonwebtoken');

const { secret } = process.env;
const protectedRoutes = (req, res, next) => {
  console.log(req.headers);
  const token = req.headers.authorization;
  if (!token) throw new Error('something went wrong');

  const accessToken = token.split(' ')[1];
  return verify(accessToken, `${secret}`, (err, decode) => {
    if (err) throw new Error('something went wrong with verify');

    req.user = decode.data.id;
    next();
  });
};

const checkIfSessionUser = (req, res, next) => {
  console.log(req.user.data);
  if (!req.session.userID || !req.session) {
    const err = res.json({ err: 'something went wrong', statusCode: 401 });
    err.statusCode = 401;
    next(err);
  }
  return next();
};

module.exports = {
  protectedRoutes,
  checkIfSessionUser,
};
