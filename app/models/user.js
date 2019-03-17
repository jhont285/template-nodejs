const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  name: String
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
