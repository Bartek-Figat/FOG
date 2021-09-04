/* eslint-disable no-unused-vars */
require('dotenv').config();

const { clientID } = process.env;
const redirectToGitHubPanelLLogin = (req, res, next) => {
  res.redirect(`https://github.com/login/oauth/authorize?client_id=${clientID}&scope=user:email`);
};

module.exports = {
  redirectToGitHubPanelLLogin,
};
