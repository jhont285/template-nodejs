const { Strategy, ExtractJwt } = require('passport-jwt');

const passport = require('passport');

const User = require('../models/user');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_PRIVATE_KEY || 'shh_very_secret',
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

module.exports = passport;
