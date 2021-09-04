/* eslint-disable camelcase */
class GithubModel {
  constructor(
    login,
    id,
    node_id,
    avatar_url,
    gravatar_id,
    url,
    html_url,
    followers_url,
    following_url,
    gists_url,
    starred_url,
    subscriptions_url,
    organizations_url,
    repos_url,
    events_url,
    received_events_url,
    type,
    site_admin,
    name,
    company,
    blog,
    location,
    email,
    hireable,
    token
  ) {
    this.login = login;
    this.id = id;
    this.node_id = node_id;
    this.avatar_url = avatar_url;
    this.gravatar_id = gravatar_id;
    this.url = url;
    this.html_url = html_url;
    this.followers_url = followers_url;
    this.following_url = following_url;
    this.gists_url = gists_url;
    this.starred_url = starred_url;
    this.subscriptions_url = subscriptions_url;
    this.organizations_url = organizations_url;
    this.repos_url = repos_url;
    this.events_url = events_url;
    this.received_events_url = received_events_url;
    this.type = type;
    this.site_admin = site_admin;
    this.name = name;
    this.company = company;
    this.blog = blog;
    this.location = location;
    this.email = email;
    this.hireable = hireable;
    this.token = token;
  }
}

module.exports = {
  GithubModel,
};
