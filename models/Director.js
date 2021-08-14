const mongoose = require('mongoose');
const { Schema } = mongoose;

const DirectorSchema = new Schema({
  name: String,
  age: Number,
  movies: Array,
});

const Director = mongoose.model('directors', DirectorSchema);

module.exports = Director;
