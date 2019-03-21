/* eslint-disable class-methods-use-this */
const HttpStatus = require('http-status-codes');
const Movie = require('../models/movie');

const { getStatusText } = HttpStatus;

class MoviesService {
  async index() {
    const movies = await Movie.find();
    return { status: HttpStatus.OK, data: movies };
  }

  async show(id) {
    const movie = await Movie.findById(id);
    if (!movie) return { status: HttpStatus.NOT_FOUND, data: getStatusText(HttpStatus.NOT_FOUND) };
    return { status: HttpStatus.OK, data: movie };
  }

  async create(body) {
    try {
      const tmpMovie = new Movie(body);
      const movie = await tmpMovie.save();
      return { status: HttpStatus.CREATED, data: movie };
    } catch (error) {
      return { status: HttpStatus.UNPROCESSABLE_ENTITY, data: error };
    }
  }

  async update(id, body) {
    try {
      const movie = await Movie.findByIdAndUpdate(id, body, { new: true });
      if (!movie) {
        return { status: HttpStatus.NOT_FOUND, data: getStatusText(HttpStatus.NOT_FOUND) };
      }
      return { status: HttpStatus.CREATED, data: movie };
    } catch (error) {
      return { status: HttpStatus.UNPROCESSABLE_ENTITY, data: error };
    }
  }

  async delete(id) {
    const movie = await Movie.findByIdAndRemove(id);
    if (!movie) return { status: HttpStatus.NOT_FOUND, data: getStatusText(HttpStatus.NOT_FOUND) };
    return { status: HttpStatus.CREATED, data: movie };
  }
}

const moviesService = new MoviesService();

module.exports = moviesService;
