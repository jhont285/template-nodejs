/* eslint-disable class-methods-use-this */

const {
  getStatusText, OK, NOT_FOUND, UNPROCESSABLE_ENTITY, CREATED,
} = require('http-status-codes');

const Movie = require('../models/movie');

class MoviesService {
  async index() {
    const movies = await Movie.find();
    return { status: OK, data: movies };
  }

  async show(id) {
    const movie = await Movie.findById(id);
    if (!movie) return { status: NOT_FOUND, data: getStatusText(NOT_FOUND) };
    return { status: OK, data: movie };
  }

  async create(body) {
    let tmpMovie;
    try {
      tmpMovie = new Movie(body);
    } catch (err) {
      return { status: UNPROCESSABLE_ENTITY, data: err };
    }

    const movie = await tmpMovie.save();
    return { status: CREATED, data: movie };
  }

  async update(id, body) {
    let movie;
    try {
      movie = await Movie.findByIdAndUpdate(id, body, { new: true });
    } catch (err) {
      return { status: UNPROCESSABLE_ENTITY, data: err };
    }

    if (!movie) return { status: NOT_FOUND, data: getStatusText(NOT_FOUND) };
    return { status: CREATED, data: movie };
  }

  async delete(id) {
    const movie = await Movie.findByIdAndRemove(id);
    if (!movie) return { status: NOT_FOUND, data: getStatusText(NOT_FOUND) };
    return { status: CREATED, data: movie };
  }
}

const moviesService = new MoviesService();

module.exports = moviesService;
