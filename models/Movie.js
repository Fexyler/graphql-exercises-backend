const mongoose = require('mongoose');
const { Schema } = mongoose;

const MovieSchema = new Schema({
  name: String,
  imdb: Number,
  director: Object,
});

const Movie = mongoose.model('movies', MovieSchema);

module.exports = Movie;
