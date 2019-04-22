/* eslint-disable class-methods-use-this */

const { OK, UNAUTHORIZED } = require('http-status-codes');
const { Strategy, ExtractJwt } = require('passport-jwt');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/user');

class SessionsService {
  constructor() {
    this.jwt = process.env.JWT_PRIVATE_KEY || 'shh_very_secret';
    this.invalidCredentials = { message: 'Invalid login credentials. Please try again.' };
  }

  async create(body) {
    const { email, password } = body;
    const user = await User.findOne({ email }).select('+encryptedPassword');
    if (!user) return { status: UNAUTHORIZED, data: this.invalidCredentials };

    try {
      const validatePassword = await bcrypt.compare(password, user.encryptedPassword);
      if (!validatePassword) return { status: UNAUTHORIZED, data: this.invalidCredentials };
    } catch (err) {
      return { status: UNAUTHORIZED, data: this.invalidCredentials };
    }

    user.encryptedPassword = undefined;
    // eslint-disable-next-line dot-notation
    const token = await jwt.sign({ id: user['_id'] }, this.jwt, { expiresIn: '15d' });
    return { status: OK, data: { token } };
  }

  verify() {
    const opts = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: this.jwt,
    };

    const strategy = new Strategy(opts, async (jwtPayload, done) => {
      try {
        const user = await User.findById(jwtPayload.id);
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      } catch (err) {
        return done(err, false);
      }
    });

    passport.use(strategy);
    return passport.authenticate('jwt', { session: false });
  }
}

const sessionsService = new SessionsService();

module.exports = sessionsService;
