const { NOT_FOUND, INTERNAL_SERVER_ERROR } = require('http-status-codes');
const compression = require('compression');
const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');
const passport = require('./app/middlewares/authPassport');

require('express-async-errors');

const app = express();

const { routerWithAuth, router } = require('./config/routes');

app.use(helmet());
app.use(compression());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/v1', router);
app.use('/v1', passport.authenticate('jwt', { session: false }), routerWithAuth);

// catch 404 and forward to error handler
app.use((req, res) => res.sendStatus(NOT_FOUND));

// error handler - send the error
// eslint-disable-next-line
app.use((err, req, res, next) => res.status(err.status || INTERNAL_SERVER_ERROR).json(err.message));

module.exports = app;
