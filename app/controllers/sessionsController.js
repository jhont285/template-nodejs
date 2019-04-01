/* eslint-disable class-methods-use-this, no-unused-vars */

const { OK } = require('http-status-codes');

const SessionsService = require('../services/sessionsService');

class SessionsController {
  async create(req, res, next) {
    const { status, data, headers } = await SessionsService.create(req.body);
    return res.set(headers).status(status).json(data);
  }

  async verify(req, res, next) {
    const token = req.header('access-token');
    const { status, data } = await SessionsService.verify(token);
    if (status !== OK) return res.sendStatus(status);

    res.locals.user = { id: data.id };
    return next();
  }
}

const sessionsController = new SessionsController();

module.exports = sessionsController;
