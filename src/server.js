/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
require('dotenv').config();
const express = require('express');
const cookieSession = require('express-session');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const compression = require('compression');
// require('../config/redis.config');
const { userRouter } = require('./routes/index');

const Port = process.env.Port || 8080;

const { secret, origin } = process.env;

const server = express();
const expiryDate = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(
  cors({
    origin,
    credentials: true,
  })
);
server.use(cookieParser());
server.use(
  cookieSession({
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true,
      httpOnly: true,
      // domain: 'example.com',
      // path: 'foo/bar',
      expires: expiryDate,
    },
  })
);
server.use(helmet());
server.use(morgan('dev'));
server.use(compression());

server.use(userRouter);

server.listen(Port, () => {
  console.log(`Listening on port ${Port}`);
});
