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
// require('../config/redis.config');
const { userRouter } = require('./routes/index');
const { github } = require('./strategy/github.strtage');

const Port = process.env.Port || 8080;

const { secret } = process.env;

const server = express();
github(server);

const { origin } = process.env;

server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(
  cors({
    origin,
    credentials: true,
  })
);
server.use(helmet());
server.use(morgan('dev'));
server.use(compression());
server.use(
  session({
    secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 100,
    },
  })
);
// 31977072

server.use(userRouter);

server.listen(Port, () => {
  console.log(`Listening on port ${Port}`);
});
