/* eslint-disable no-undef */
require('dotenv').config();
const { compare, genSalt, hash } = require('bcrypt');
const { ObjectId } = require('mongodb');
const { sign } = require('jsonwebtoken');
const { UserRepository } = require('../repositories/userRepository');
const { UserModel } = require('../models/user.model');
const { GithubModel } = require('../models/github.model');

const { secret } = process.env;

class UserService {
  static userRepository = UserRepository;

  static async createUser({ firstName, lastName, email, password }) {
    const existingUser = await this.userRepository.findOne({ email });
    if (existingUser) {
      return;
    }

    const salt = await genSalt(10);
    const hashPassword = await hash(password, salt);
    const userModel = new UserModel(firstName, lastName, email, hashPassword);
    const insert = await this.userRepository.insertOne(userModel);
    // eslint-disable-next-line consistent-return
    return insert;
  }

  static async createToken({ email, password }) {
    const document = await this.userRepository.findOne({ email });
    const match = document && (await compare(password, document.password));
    if (!match) return;

    // eslint-disable-next-line consistent-return
    return {
      accessToken: sign(
        {
          data: {
            id: document._id,
          },
        },
        // eslint-disable-next-line comma-dangle
        `${secret}`
      ),
    };
  }

  static async showUser(id, options) {
    const document = await this.userRepository.findOne({ id }, options);
    return document;
  }

  static async updateUser(filter, updateDoc) {
    const document = await this.userRepository.updateOne({ _id: ObjectId(filter) }, updateDoc);
    return document;
  }

  static async deleteUser(query) {
    const document = await this.userRepository.deleteOne({ _id: ObjectId(query) });
    return document;
  }

  static async findOrCreate(profile, token) {
    const githubUser = await this.userRepository.findOne({ id: profile.data.id });
    console.log('githubUser', githubUser);

    if (githubUser) return githubUser.id;

    const githubModel = new GithubModel(
      profile.data.login,
      profile.data.id,
      profile.data.node_id,
      profile.data.avatar_url,
      profile.data.gravatar_id,
      profile.data.url,
      profile.data.html_url,
      profile.data.followers_url,
      profile.data.following_url,
      profile.data.gists_url,
      profile.data.starred_url,
      profile.data.subscriptions_url,
      profile.data.organizations_url,
      profile.data.repos_url,
      profile.data.events_url,
      profile.data.received_events_url,
      profile.data.type,
      profile.data.site_admin,
      profile.data.name,
      profile.data.company,
      profile.data.blog,
      profile.data.location,
      profile.data.email,
      profile.data.hireable,
      token
    );
    const githubUseWasCreated = await this.userRepository.insertOne(githubModel);

    console.log('githubUseWasCreated', githubUseWasCreated);

    const userInsertedID = await this.userRepository.find({ _id: githubUseWasCreated.insertedId });
    return userInsertedID[0].id;
  }

  static async tokenVerification(query) {
    const token = await this.userRepository.findOne({ token: query });

    return token;
  }

  static async deletSessionToken(query) {
    const findToken = await this.userRepository.findOne({ token: query });
    console.log('findToken -> 109', findToken);
    const token = await this.userRepository.deleteOne({ token: findToken });
    console.log('token -> 111', token);
    return token;
  }
}

module.exports = {
  UserService,
};
