import { ApolloServer, makeExecutableSchema } from "apollo-server-express";
import express from "express";
import dotenv from "dotenv";
// Import GraphQL type definitions and resolvers
import { typeDefs, resolvers } from "./schema";
// Import CoronaAPI, built with apollo-datasource-rest
import { CoronaAPIDataSource } from "./data-source";

// set environment variables from ../.env
dotenv.config();

// Build an express server
const app = express();

// Specify port and path for GraphQL endpoint
const port = process.env.GRAPHQL_LISTEN_PORT || 4001;
const path = process.env.GRAPHQL_URI || "/";

// Specify base url for CoronaAPI REST API and setup apollo datasource
const CORONA_API_URL =
  process.env.CORONA_API_URL || "https://corona.ndo.dev/v1";
const coronaAPI = new CoronaAPIDataSource({ baseURL: CORONA_API_URL });
coronaAPI.initialize({});

// Build an executable GraphQL schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

// Setup the Apollo GraphQL server
const server = new ApolloServer({
  schema,
  dataSources: () => {
    return {
      coronaAPI
    };
  },
  context: ({ req }) => {
    return {
      req
    };
  },
  introspection: true,
  playground: true
});

/*
 * Optionally, apply Express middleware for authentication, etc
 * This also also allows us to specify a path for the GraphQL endpoint
 */
server.applyMiddleware({ app, path });

// Start the server!
app.listen({ port, path }, () => {
  console.log(`CoronaAPI GraphQL API ready at http://localhost:${port}${path}`);
});
