/* eslint-disable class-methods-use-this */

const {
  getStatusText, UNAUTHORIZED, OK,
} = require('http-status-codes');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

class SessionsService {
  constructor() {
    this.jwt = process.env.JWT_PRIVATE_KEY || 'shh_very_secret';
    this.invalidCredentials = { message: 'Invalid login credentials. Please try again.' };
  }

  async create(body) {
    const { email, password } = body;
    const user = await User.findOne({ email });
    if (!user) return { status: UNAUTHORIZED, data: this.invalidCredentials };

    try {
      const validatePassword = await bcrypt.compare(password, user.encryptedPassword);
      if (!validatePassword) return { status: UNAUTHORIZED, data: this.invalidCredentials };
    } catch (err) {
      return { status: UNAUTHORIZED, data: this.invalidCredentials };
    }

    user.encryptedPassword = undefined;
    // eslint-disable-next-line dot-notation
    const token = await jwt.sign({ id: user['_id'] }, this.jwt);
    return { status: OK, data: { token } };
  }

}

const sessionsService = new SessionsService();

module.exports = sessionsService;
