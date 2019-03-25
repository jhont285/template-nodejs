/* eslint-disable class-methods-use-this */

const {
  UNPROCESSABLE_ENTITY,
} = require('http-status-codes');

const bcrypt = require('bcrypt');
const User = require('../models/user');
const SessionsService = require('./sessionsService');

class AccountsService {
  async create(body) {
    const saltRounds = process.env.SALT_ROUNDS || 10;
    let user;
    try {
      user = new User({
        ...body,
        encryptedPassword: await bcrypt.hash(body.password, saltRounds),
      });
    } catch (err) {
      return { status: UNPROCESSABLE_ENTITY, data: err };
    }

    await user.save();
    const dataSession = { email: user.email, password: body.password };
    return SessionsService.create(dataSession);
  }
}

const accountsService = new AccountsService();

module.exports = accountsService;
