const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Cat {
    id: ID!
    name: String!
    type: String!
    age: Int!
    children: [Cat!]
  }
  input CatInput {
    name: String!
    type: String!
    age: Int!
    children: [CatInput!]
  }
  type Query {
    hello(name: String!): String!
    cats: [Cat!]!
    cat(catID: ID): Cat!
  }
  type Mutation {
    addCat(cat: CatInput!): String!
  }
`;
module.exports = typeDefs;