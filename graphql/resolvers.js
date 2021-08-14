const Cat = require('../models/Cat');
const Movie = require('../models/Movie');
const Director = require('../models/Director');

const resolvers = {
  Query: {
    hello: (parent, {name}) => {
      return `hey ${name}`
    },
    cats: async () => {
      const cats = await Cat.find({});
      return cats
    },
    cat: async (parent, {catID}) => {
      const cat = await Cat.findById(catID);
      return cat
    },
    movie: async (parent, {movieID}) => {
      const movie = await Movie.findById(movieID);
      return movie
    },
    movies: async () => {
      const movies = await Movie.find({});
      return movies
    },
    director: async (parent, {directorID}) => {
      console.log(directorID)
      const director = await Director.findById(directorID);
      return director
    },
    directors: async () => {
      const directors = await Director.find({});
      return directors
    },
  },
  Movie: {
    director: async (parent, args) => {
      console.log(parent, "child")
      const director = await Director.findById(parent.director.id);
      return director
    }
  },
  Mutation: {
    addCat: async (parent, {cat}) => {
      const catInstance = new Cat({
        name: cat.name,
        age: cat.age,
        type: cat.type,
        children: cat.children
      });
      await catInstance.save();
      return "New Cat added successfully!"
    },
    updateCat: async (parent, {cat}) => {
      const updatedCat = await Cat.findByIdAndUpdate(cat.id, {
        name: cat.name,
        type: cat.type,
        age: cat.age,
        children: cat.children
      }, {new: true});
      return {
        id: updatedCat.id,
        name: updatedCat.name,
        type: updatedCat.type
      }
    },
    addMovie: async (parent, {movie}) => {
      console.log(movie)
      const movieInstance = new Movie({
        name: movie.name,
        imdb: movie.imdb,
        director: movie.director
      });
      await movieInstance.save();
      return "New Movie added successfully!"
    },
    updateMovie: async (parent, {movie}) => {
      const updatedMovie = await Movie.findByIdAndUpdate(movie.id, {
        name: movie.name,
        imdb: movie.imdb,
        director: movie.director
      }, {new: true});
      return {
        id: updatedMovie.id,
        name: updatedMovie.name,
        imdb: updatedMovie.imdb,
        director: updatedMovie.director
      }
    },
    addDirector: async (parent, {director}) => {
      const directorInstance = new Director({
        name: director.name,
        age: director.age,
        movies: director.movies
      });
      await directorInstance.save();
      return "New Director added successfully!"
    }
  }
};

module.exports = resolvers;