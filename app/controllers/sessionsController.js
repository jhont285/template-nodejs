/* eslint-disable class-methods-use-this, no-unused-vars */

const { OK } = require('http-status-codes');

const SessionsService = require('../services/sessionsService');

class SessionsController {
  async create(req, res, next) {
    const { status, data } = await SessionsService.create(req.body);
    return res.status(status).json(data);
  }

  verify() {
    return SessionsService.verify();
  }
}

const sessionsController = new SessionsController();

module.exports = sessionsController;
