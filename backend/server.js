/* eslint-disable radix */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const compression = require('compression');
// const RedisStore = require('connect-redis')(session);

// const { client } = require('../config/redis.config');
// require('../config/redis.config');
// 
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
server.enable('trust proxy');
server.use(
  session({
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      httpOnly: true,
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
