import resolvers from './resolvers';
import typeDefs from './schema';

const { ApolloServer } = require("apollo-server-lambda");

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers
});

exports.handler = server.createHandler();
