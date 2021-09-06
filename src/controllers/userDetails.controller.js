/* eslint-disable no-unused-vars */
const { UserService } = require('../services/userService');

const shwoUserDetails = async (req, res, next) => {
  const options = { projection: { _id: 0, id: 0, token: 0 } };
  const userData = await UserService.showUser(req.session.user, options);

  res.json({ user: userData });
};

module.exports = { shwoUserDetails };
