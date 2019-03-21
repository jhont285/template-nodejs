const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  user: String,
  voteCount: Number,
  title: String,
  popularity: Number,
  posterPath: String,
  originalLanguage: String,
  originalTitle: String,
  backdropPath: String,
  adult: Boolean,
  overview: String,
  releaseDate: String,
}, { timestamps: true });

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
