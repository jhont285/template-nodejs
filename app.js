const HttpStatus = require('http-status-codes');
const createError = require('http-errors');
const compression = require('compression')
const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');

const app = express();

app.use(helmet());
app.use(compression())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/hi', (req, res) => {
  res.json("hello world!!!");
})

// catch 404 and forward to error handler
app.use((req, res, next) => next(createError(HttpStatus.NOT_FOUND)));

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.sendStatus(err.status || HttpStatus.INTERNAL_SERVER_ERROR);
});

module.exports = app;
