/* eslint-disable class-methods-use-this, no-unused-vars */

const MoviesService = require('../services/moviesService');

class MoviesController {
  async index(req, res, next) {
    const { status, data } = await MoviesService.index();
    return res.status(status).json(data);
  }

  async show(req, res, next) {
    const { status, data } = await MoviesService.show(req.params.id);
    return res.status(status).json(data);
  }

  async create(req, res, next) {
    const { status, data } = await MoviesService.create(req.body);
    return res.status(status).json(data);
  }

  async update(req, res, next) {
    const { status, data } = await MoviesService.update(req.params.id, req.body);
    return res.status(status).json(data);
  }

  async delete(req, res, next) {
    const { status, data } = await MoviesService.delete(req.params.id);
    return res.status(status).json(data);
  }
}

const movieController = new MoviesController();

module.exports = movieController;
