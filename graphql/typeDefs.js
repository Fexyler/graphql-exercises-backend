const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Cat {
    id: ID!
    name: String!
    type: String!
    age: Int!
    children: [Cat!]
  }
  type Director {
    id: ID!
    name: String!
    age: Int!
    movies: [Movie]!
  }
  type Movie {
    id: ID!
    name: String!
    imdb: Float!
    director: Director!
  }
  interface MutationResponse {
    id: ID!
    name: String!
  }
  type CatUpdateResponse implements MutationResponse {
    id: ID!
    name: String!
    type: String!
  }
  type MovieUpdateResponse implements MutationResponse {
    id: ID!
    name: String!
    imdb: Float!
    director: Director!
  }
  input CatInput {
    name: String!
    type: String!
    age: Int!
    children: [CatInput!]
  }
  input DirectorInput {
    id: ID!
    name: String!
    age: Int!
  }
  input AddDirectorInput {
    name: String!
    age: Int!
  }
  input MovieInput {
    name: String!
    imdb: Float!
    director: DirectorInput!
  }
  input UpdateMovieInput {
    id: ID!
    name: String!
    imdb: Float!
    director: DirectorInput!
  }
  input CatUpdateInput {
    id: ID!
    name: String!
    type: String!
    age: Int!
    children: [CatInput!]
  }
  type Query {
    hello(name: String!): String!
    cats: [Cat!]!
    cat(catID: ID!): Cat!
    movie(movieID: ID!): Movie!
    movies: [Movie!]!
    director(directorID: ID!): Director!
    directors: [Director!]!
  }
  type Mutation {
    addCat(cat: CatInput!): String!
    updateCat(cat: CatUpdateInput!): CatUpdateResponse!
    addMovie(movie: MovieInput!): String!
    updateMovie(movie: UpdateMovieInput!): MovieUpdateResponse!
    addDirector(director: AddDirectorInput!): String!
  }
`;
module.exports = typeDefs;