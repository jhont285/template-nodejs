/* eslint-disable class-methods-use-this, no-unused-vars */

const AccountsService = require('../services/accountsService');

class AccountsController {
  async create(req, res, next) {
    const { status, data, headers } = await AccountsService.create(req.body);
    return res.set(headers).status(status).json(data);
  }

  // async update(req, res, next) {
  //
  // }
  //
  // async delete(req, res, next) {
  //
  // }
}

const accountsController = new AccountsController();

module.exports = accountsController;
