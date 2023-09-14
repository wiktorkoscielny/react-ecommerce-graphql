import resolvers from './resolvers';
import typeDefs from './schema';
import { ApolloServer } from "apollo-server-lambda";

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers
});

exports.handler = server.createHandler();
