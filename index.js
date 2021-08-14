const express = require('express');
const xss = require('xss-clean');
const morgan = require('morgan');
const mongoose = require('mongoose');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const cors = require('cors');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
require('dotenv').config();
const { NODE_ENV } = process.env;
const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.MONGO_DB_URI, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));


const app = express();

if (NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('tiny'));
}

app.use(xss());
app.use(mongoSanitize());

// for compressing requests
app.use(compression());

// enable cors for local development environment
app.use(cors());
app.options('*', cors());

(async function () {
  const server = new ApolloServer({typeDefs, resolvers,   plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground({
    })
  ] })
  await server.start();
  server.applyMiddleware({ app });
  app.listen(PORT, () => {
    console.log(`🚀 Server is ready at http://localhost:${PORT}/graphql`)
  })
}())
