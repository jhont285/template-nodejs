const HttpStatus = require('http-status-codes');
const createError = require('http-errors');
const compression = require('compression');
const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');
const mongoose = require('mongoose');

require('express-async-errors');

const app = express();

const routes = require('./config/routes');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/test', { useNewUrlParser: true });

app.use(helmet());
app.use(compression());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/v1', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => next(createError(HttpStatus.NOT_FOUND)));

// error handler
app.use((err, req, res, next) => {  // eslint-disable-line
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // send the error
  res.status(err.status || HttpStatus.INTERNAL_SERVER_ERROR).json(err.message);
});

module.exports = app;
