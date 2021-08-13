const mongoose = require('mongoose');
const { Schema } = mongoose;

const CatSchema = new Schema({
  name: String,
  type: String,
  age: Number,
  children: Array,
});

const Cat = mongoose.model('cats', CatSchema);

module.exports = Cat;
